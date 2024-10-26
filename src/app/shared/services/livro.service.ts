import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Livro } from '../models/livro.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class LivroService {

  constructor(private http: HttpClient) { }

  public all(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${environment.apiUrl}/livro/todos`);
  }

  public create(model: Livro): Observable<number | null> {
    return this.http.post<number>(`${environment.apiUrl}/livro`, model);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/livro/${id}`);
  }

  public get(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${environment.apiUrl}/livro/${id}`);
  }

    public put(model: Livro): Observable<number | null> {
    return this.http.put<number>(`${environment.apiUrl}/livro`, model);
  }
}
