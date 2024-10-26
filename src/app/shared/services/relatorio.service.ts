import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Relatorio } from '../models/relatorio.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class RelatorioService {

  constructor(private http: HttpClient) { }

  public all(): Observable<Relatorio[]> {
    return this.http.get<Relatorio[]>(`${environment.apiUrl}/assunto/todos`);
  }
}
