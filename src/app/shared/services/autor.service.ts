import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from '../models/autor.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AutorService {

  constructor(private http: HttpClient) { }

  public all(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${environment.apiUrl}/autor/todos`);
  }

  public create(model: Autor): Observable<number | null> {
    return this.http.post<number>(`${environment.apiUrl}/autor`, model);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/autor/${id}`);
  }

  public get(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${environment.apiUrl}/autor/${id}`);
  }

    public put(model: Autor): Observable<number | null> {
    return this.http.put<number>(`${environment.apiUrl}/autor`, model);
  }
}
