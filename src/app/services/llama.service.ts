import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlamaService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}
  
  public fetchTGetList(items: string): Observable<string> {

    const params = {
      items: items,
    };
    console.log('consulta al side bar')
    return this.http.get<any>(`${this.baseUrl}list`, {params})
      .pipe(
        map((response) => response.responseLlama)
      );
  };

  public fetchTGetInitialText(items: string): Observable<string> {

    const params = {
      items: items,
    };
    console.log('consulta al texto inicial');
    
    return this.http.get<any>(`${this.baseUrl}initialText`, {params})
      .pipe(
        map((response) => response.responseLlama)
      );
  };

  public fetchTGetText(items: string): Observable<string> {
    const arrayTexto = items.split('-')
    const body = {
      items: arrayTexto,
    };
    console.log(JSON.stringify(body))

    return this.http.post<any>(`${this.baseUrl}textIa`, {arrayTexto})
      .pipe(
        map((response) => response.responseLlama)
      );
  }
}

