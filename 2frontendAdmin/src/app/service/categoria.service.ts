import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoriaDTO {
  idCategoria: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http = inject(HttpClient);

  private api = 'http://localhost:8080/api/categorias';

  listar(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(this.api);
  }

  guardar(categoria: CategoriaDTO): Observable<CategoriaDTO> {
    return this.http.post<CategoriaDTO>(this.api, categoria);
  }

  actualizar(id: number, categoria: CategoriaDTO): Observable<CategoriaDTO> {
    return this.http.put<CategoriaDTO>(`${this.api}/${id}`, categoria);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.api}/${id}`);
  }
}