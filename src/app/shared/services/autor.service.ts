import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from '../models/autor.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AutorService {

  constructor(private http: HttpClient) { }

  public create(model: Autor): Observable<number | null> {
    return this.http.post<number>(`${environment.apiUrl}/autor`, model);
  }
}
