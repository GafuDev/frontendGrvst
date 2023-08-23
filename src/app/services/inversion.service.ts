import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inversion } from '../models/inversionModel';

@Injectable({
  providedIn: 'root'
})
export class InversionService {
  private apiUrl = 'http://localhost:3000/inversiones';

  constructor(private http: HttpClient) {}

  listarInversiones(): Observable<Inversion[]> {
    return this.http.get<Inversion[]>(this.apiUrl);
  }
}
