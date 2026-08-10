import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { PedidoService } from '../../tienda-cliente/services/pedido.service';
import { InventarioService } from '../../tienda-cliente/services/inventario.service';
import { Pedido } from '../../shared/models/pedido.models';

type Vista = 'anio' | 'mes' | 'semana';

const NOMBRES_MES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const NOMBRES_DIA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  meses = NOMBRES_MES;

  private inventario = inject(InventarioService);

  // -------- estado del selector --------
  vista = signal<Vista>('anio');

  opciones: { id: Vista; label: string }[] = [
    { id: 'anio', label: 'Año' },
    { id: 'mes', label: 'Mes' },
    { id: 'semana', label: 'Semana' },
  ];

  // Cuando la vista es "mes", se elige a qué mes pertenecen esas semanas.
  mesSeleccionado = signal<string>(NOMBRES_MES[new Date().getMonth()]);

  // Filtro por categoría (0 = todas las categorías).
  categorias = this.inventario.categoriasSignal();
  categoriaFiltro = signal<number>(0);

  private pedidos!: ReturnType<PedidoService['pedidosSignal']>;

  constructor(private pedidoService: PedidoService) {
    this.pedidos = this.pedidoService.pedidosSignal();
  }

  cambiarVista(id: Vista) {
    this.vista.set(id);
  }

  formatearSoles(valor: number): string {
    return 'S/. ' + valor.toLocaleString('es-PE');
  }

  imprimir() {
    window.print();
  }

  // -------- helpers de filtro por categoría --------

  private categoriaDeProducto(productoId: number): number | undefined {
    return this.inventario.obtenerProductoPorId(productoId)?.categoriaId;
  }

  // Monto de un pedido a considerar en los totales: si hay filtro de
  // categoría activo, solo se suman los ítems de esa categoría (montos
  // sin IGV, a nivel de detalle); si no, se usa el total del pedido.
  private montoFiltrado(pedido: Pedido): number {
    const catId = this.categoriaFiltro();
    if (!catId) return pedido.total;

    return pedido.productos
      .filter((item) => this.categoriaDeProducto(item.productoId) === catId)
      .reduce((acc, item) => acc + item.subtotal, 0);
  }

  // -------- agregaciones sobre los pedidos reales --------

  // Ventas por mes, dentro del año actual.
  private ventasPorMes = computed<Record<string, number>>(() => {
    const anioActual = new Date().getFullYear();
    const totales: Record<string, number> = {};
    NOMBRES_MES.forEach((m) => (totales[m] = 0));

    this.pedidos().forEach((p) => {
      const fecha = new Date(p.fecha);
      if (fecha.getFullYear() === anioActual) {
        totales[NOMBRES_MES[fecha.getMonth()]] += this.montoFiltrado(p);
      }
    });

    return totales;
  });

  // Ventas por semana, dentro del mes seleccionado.
  private ventasPorSemanaDelMes = computed<Record<string, number>>(() => {
    const indiceMes = NOMBRES_MES.indexOf(this.mesSeleccionado());
    const anioActual = new Date().getFullYear();
    const totales: Record<string, number> = {
      'Semana 1': 0,
      'Semana 2': 0,
      'Semana 3': 0,
      'Semana 4': 0,
      'Semana 5': 0,
    };

    this.pedidos().forEach((p) => {
      const fecha = new Date(p.fecha);
      if (fecha.getFullYear() === anioActual && fecha.getMonth() === indiceMes) {
        const semana = Math.min(5, Math.ceil(fecha.getDate() / 7));
        totales[`Semana ${semana}`] += this.montoFiltrado(p);
      }
    });

    return totales;
  });

  // Ventas por día, dentro de la semana actual (lunes a domingo).
  private ventasPorDia = computed<Record<string, number>>(() => {
    const [lunes, domingo] = this.rangoSemanaActual();

    const totales: Record<string, number> = {};
    NOMBRES_DIA.forEach((d) => (totales[d] = 0));

    this.pedidos().forEach((p) => {
      const fecha = new Date(p.fecha);
      if (fecha >= lunes && fecha <= domingo) {
        const indice = (fecha.getDay() + 6) % 7;
        totales[NOMBRES_DIA[indice]] += this.montoFiltrado(p);
      }
    });

    return totales;
  });

  private rangoSemanaActual(): [Date, Date] {
    const hoy = new Date();
    const diaSemanaHoy = (hoy.getDay() + 6) % 7; // 0 = lunes
    const lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - diaSemanaHoy);
    lunes.setHours(0, 0, 0, 0);
    const domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6);
    domingo.setHours(23, 59, 59, 999);
    return [lunes, domingo];
  }

  // Pedidos dentro del rango de fechas actualmente seleccionado
  // (año completo / mes elegido / semana actual), usado para "más vendidos".
  private pedidosEnPeriodo = computed<Pedido[]>(() => {
    const vistaActual = this.vista();
    const anioActual = new Date().getFullYear();

    if (vistaActual === 'anio') {
      return this.pedidos().filter((p) => new Date(p.fecha).getFullYear() === anioActual);
    }

    if (vistaActual === 'mes') {
      const indiceMes = NOMBRES_MES.indexOf(this.mesSeleccionado());
      return this.pedidos().filter((p) => {
        const fecha = new Date(p.fecha);
        return fecha.getFullYear() === anioActual && fecha.getMonth() === indiceMes;
      });
    }

    const [lunes, domingo] = this.rangoSemanaActual();
    return this.pedidos().filter((p) => {
      const fecha = new Date(p.fecha);
      return fecha >= lunes && fecha <= domingo;
    });
  });

  // Top 5 productos más vendidos (por cantidad) en el período y categoría
  // actualmente seleccionados.
  productosMasVendidos = computed<{ nombre: string; cantidad: number }[]>(() => {
    const catId = this.categoriaFiltro();
    const conteo = new Map<number, { nombre: string; cantidad: number }>();

    this.pedidosEnPeriodo().forEach((p) => {
      p.productos.forEach((item) => {
        if (catId && this.categoriaDeProducto(item.productoId) !== catId) return;

        const actual = conteo.get(item.productoId) ?? { nombre: item.nombre, cantidad: 0 };
        actual.cantidad += item.cantidad;
        conteo.set(item.productoId, actual);
      });
    });

    return Array.from(conteo.values())
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);
  });

  totalPeriodo = computed(() => {
    const datos = this.chartData();
    const valores = datos.datasets[0]?.data as number[];
    return valores.reduce((acc, v) => acc + v, 0);
  });

  // -------- construcción de datos del gráfico --------
  chartData = computed<ChartData<'bar'>>(() => {
    const vistaActual = this.vista();

    let labels: string[] = [];
    let data: number[] = [];
    let etiquetaSerie = 'Ventas';

    if (vistaActual === 'anio') {
      const ventas = this.ventasPorMes();
      labels = this.meses;
      data = this.meses.map((m) => ventas[m]);
      etiquetaSerie = 'Ventas por mes (S/.)';
    } else if (vistaActual === 'mes') {
      const ventas = this.ventasPorSemanaDelMes();
      labels = Object.keys(ventas);
      data = Object.values(ventas);
      etiquetaSerie = `Ventas por semana · ${this.mesSeleccionado()} (S/.)`;
    } else {
      const ventas = this.ventasPorDia();
      labels = Object.keys(ventas);
      data = Object.values(ventas);
      etiquetaSerie = 'Ventas por día · esta semana (S/.)';
    }

    return {
      labels,
      datasets: [
        {
          label: etiquetaSerie,
          data,
          backgroundColor: '#10b981',
          hoverBackgroundColor: '#059669',
          borderColor: '#047857',
          borderWidth: 1,
          borderRadius: 8,
          maxBarThickness: 46,
        },
      ],
    };
  });

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#1e1b3a', font: { family: 'Poppins', size: 12.5 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` S/. ${Number(ctx.parsed.y).toLocaleString('es-PE')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { family: 'Poppins', size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
        ticks: {
          color: '#6b7280',
          font: { family: 'Poppins', size: 12 },
          callback: (value) => 'S/. ' + Number(value).toLocaleString('es-PE'),
        },
      },
    },
  };

  chartType: ChartConfiguration<'bar'>['type'] = 'bar';
}
