import { Injectable } from '@angular/core';
import { Http,Headers,Response} from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Observable } from "rxjs";
import  "rxjs/add/operator/toPromise";

import { Pedido } from '../model/pedido';

@Injectable()
export class PedidoService {
  private URL_API_PEDIDO:string='http://'+window.localStorage.getItem('server')+'/api/v1/pedido';

  constructor(private _http:Http) {  }

  agregar(pedido:Pedido){
    return this._http.post(this.URL_API_PEDIDO,pedido,{
      headers:this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  autorizacion(pedido:Pedido){
    return this._http.post(this.URL_API_PEDIDO+'/autorizacion',pedido,{
      headers: this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  listarPedidosCreados(idVendedor:number){
    return this._http.get(this.URL_API_PEDIDO+'/vendedor?codVendedor='+idVendedor,{
      headers: this.bearerAccess()
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
