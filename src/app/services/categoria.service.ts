import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoriaModel';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseUrl = 'http://localhost:3000/proyecto';

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/proyecto`; // Reemplazar con la ruta correcta y verificar si va ruta
    return this.http.get<Categoria[]>(url);
  }
}
