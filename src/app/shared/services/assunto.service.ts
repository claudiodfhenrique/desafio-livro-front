import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assunto } from '../models/assunto.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AssuntoService {

  constructor(private http: HttpClient) { }

  public all(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(`${environment.apiUrl}/assunto/todos`);
  }

  public create(model: Assunto): Observable<number | null> {
    return this.http.post<number>(`${environment.apiUrl}/assunto`, model);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/assunto/${id}`);
  }

  public get(id: number): Observable<Assunto> {
    return this.http.get<Assunto>(`${environment.apiUrl}/assunto/${id}`);
  }

    public put(model: Assunto): Observable<number | null> {
    return this.http.put<number>(`${environment.apiUrl}/assunto`, model);
  }
}
