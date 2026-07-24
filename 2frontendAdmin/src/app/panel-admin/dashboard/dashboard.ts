import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

type Vista = 'anio' | 'mes' | 'semana';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // -------- datos de prueba (ficticios) --------
  // ESTE BLOQUE ES RELLENO DEL FRONTEND.
  // El gráfico de barras actualmente usa datos estáticos locales y no refleja
  // información real del backend.
  private ventasPorMes: Record<string, number> = {
    Enero: 12500,
    Febrero: 18200,
    Marzo: 15700,
    Abril: 21300,
    Mayo: 19800,
    Junio: 23400,
    Julio: 26100,
    Agosto: 24700,
    Septiembre: 20900,
    Octubre: 27600,
    Noviembre: 31200,
    Diciembre: 35800,
  };

  private ventasPorSemanaDelMes: Record<string, number> = {
    'Semana 1': 4200,
    'Semana 2': 5100,
    'Semana 3': 3800,
    'Semana 4': 4900,
  };

  private ventasPorDia: Record<string, number> = {
    Lunes: 1200,
    Martes: 1450,
    Miércoles: 980,
    Jueves: 1620,
    Viernes: 2100,
    Sábado: 2450,
    Domingo: 1350,
  };

  meses = Object.keys(this.ventasPorMes);

  // -------- estado del selector --------
  vista = signal<Vista>('anio');

  opciones: { id: Vista; label: string }[] = [
    { id: 'anio', label: 'Año' },
    { id: 'mes', label: 'Mes' },
    { id: 'semana', label: 'Semana' },
  ];

  // Cuando la vista es "mes", se elige a qué mes pertenecen esas semanas.
  mesSeleccionado = signal<string>('Enero');

  cambiarVista(id: Vista) {
    this.vista.set(id);
  }

  formatearSoles(valor: number): string {
    return 'S/. ' + valor.toLocaleString('es-PE');
  }

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
      labels = this.meses;
      data = this.meses.map((m) => this.ventasPorMes[m]);
      etiquetaSerie = 'Ventas por mes (S/.)';
    } else if (vistaActual === 'mes') {
      labels = Object.keys(this.ventasPorSemanaDelMes);
      data = Object.values(this.ventasPorSemanaDelMes);
      etiquetaSerie = `Ventas por semana · ${this.mesSeleccionado()} (S/.)`;
    } else {
      labels = Object.keys(this.ventasPorDia);
      data = Object.values(this.ventasPorDia);
      etiquetaSerie = 'Ventas por día · esta semana (S/.)';
    }

    return {
      labels,
      datasets: [
        {
          label: etiquetaSerie,
          data,
          backgroundColor: '#6366f1',
          hoverBackgroundColor: '#4338ca',
          borderRadius: 6,
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
