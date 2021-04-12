import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const routes = {
  listatransacoes: () => `${environment.UrlServer}/listatransacoes`,
};


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};


@Injectable({
  providedIn: 'root'
})

export class TransacoesService {
  

   constructor(private httpClient: HttpClient) {}


  
  getTransacoesHTTP() {
      return this.httpClient.get(routes.listatransacoes())
    .pipe(catchError(() => of('Error, could not load users')));
  }

  removeTransacaoHTTP(id: number): Observable<{}> {
    return this.httpClient
    .delete(routes.listatransacoes() + `/${id}`, httpOptions)
    .pipe(catchError(() => of('Error, could not load users')));
  }

  postTransacao(transacao: any): Observable<any>  {
    let nome = transacao['nome'];
    let valorTransacao = transacao['valorTransacao'];
    let diaTransacao = transacao['diaTransacao'];
    let mesTransacao = transacao['mesTransacao'];
    let anoTransacao = transacao['anoTransacao'];
    let classificacaoTransacao = transacao['classificacaoTransacao'];

    let body = 
    `nome=${nome}&valorTransacao=${valorTransacao}&diaTransacao=${diaTransacao}&mesTransacao=${mesTransacao}&anoTransacao=${anoTransacao}&classificacaoTransacao=${classificacaoTransacao}`;
   
    return this.httpClient.post(routes.listatransacoes(), body, httpOptions)
    .pipe(catchError(() => of('Error, could not load users')));
  }

}

 