import { Injectable } from '@angular/core';
import { Http,Headers,Response} from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Observable } from "rxjs";
import  "rxjs/add/operator/toPromise";

import { Cliente } from '../model/cliente';

@Injectable()
export class ArticuloService {
  private URL_API_ARTICULO:string='http://'+window.localStorage.getItem('server')+'/api/v1/articulo/';

  constructor(private _http:Http) {  }

  listaArticulos(cliente:Cliente){
    return this._http.get(this.URL_API_ARTICULO+'?listaCliente='+cliente.ListaDePrecios,{
      headers:this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  bearerAccess():Headers{
     let headers = new Headers();
     headers.append('Authorization','Bearer '+window.sessionStorage.getItem('access_token'));
     return headers;
   }

  private extractData(res: Response) {
    let body = res.json();
    return body|| {};
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error);
    return Observable.throw(error);
  }

}
