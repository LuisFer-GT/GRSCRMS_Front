import { Injectable } from '@angular/core';
import { Http,Headers,Response} from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Observable } from "rxjs";
import  "rxjs/add/operator/toPromise";
import {Usuario} from '../model/usuario';
import { Pedido } from '../model/pedido';

@Injectable()
export class PedidoService {
  private URL_API_PEDIDO:string='http://'+window.localStorage.getItem('server')+'/api/v1/pedido';
  usuario;
  constructor(private _http:Http) {
    this.usuario =  JSON.parse(window.sessionStorage.getItem('usuario'));
  }

  agregar(pedido:Pedido){
    let usuario =<Usuario> JSON.parse(window.sessionStorage.getItem('usuario'));
    delete usuario.authorities;
    pedido.usuario=usuario;
    return this._http.post(this.URL_API_PEDIDO+'?pais='+this.usuario.pais,pedido,{
      headers:this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  autorizacion(pedido:Pedido){
    let usuario =<Usuario> JSON.parse(window.sessionStorage.getItem('usuario'));
    delete usuario.authorities;
    pedido.usuario=usuario;
    return this._http.post(this.URL_API_PEDIDO+'/autorizacion'+'?pais='+this.usuario.pais,pedido,{
      headers: this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  listarPedidosCreados(idVendedor:number){
    return this._http.get(this.URL_API_PEDIDO+'/vendedor?codVendedor='+idVendedor+'&pais='+this.usuario.pais,{
      headers: this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  listaPedidosCliente(vendedor:string){
    return this._http.get(this.URL_API_PEDIDO+'/autorizacion?vendedor='+vendedor+'&pais='+this.usuario.pais,{
      headers: this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  listaDetallePedidoCreado(docEntry:number){
    return this._http.get(this.URL_API_PEDIDO+'/creado/detalle?docEntry='+docEntry+'&pais='+this.usuario.pais,{
      headers: this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  listaDetalleAutorizacion(pedido){
    return this._http.post(this.URL_API_PEDIDO+'/detalle'+'?pais='+this.usuario.pais,pedido,{
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
