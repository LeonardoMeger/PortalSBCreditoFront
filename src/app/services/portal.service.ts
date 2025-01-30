import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TituloListar } from '../models/Titulo';
import { Response } from '../models/Response';
@Injectable({
  providedIn: 'root'
})
export class PortalService {

  ApiUrl = environment.UrlApi;

  constructor(private http : HttpClient) { }

  GetTitulos(): Observable<TituloListar[]> {
    return this.http.get<TituloListar[]>(this.ApiUrl);  // API retorna um array diretamente
  }
  DeletarTitulo(id: string | undefined): Observable<void> {
    if (!id) {
      console.error("Erro: ID inválido para exclusão.");
      return throwError(() => new Error("ID inválido para exclusão."));
    }
  
    return this.http.delete<void>(`${this.ApiUrl}/${id}`).pipe(
      catchError(error => {
        console.error("Erro ao deletar título:", error);
        return throwError(() => error);
      })
    );
  }

  criarTitulo(titulo: any): Observable<any> {
    return this.http.post<any>(this.ApiUrl, titulo);
  }
}
