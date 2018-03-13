import { Injectable } from '@angular/core';
import { Http,Headers,Response} from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Observable } from "rxjs";
import  "rxjs/add/operator/toPromise";

import { Cliente } from '../model/cliente';
import { Configuracion } from '../model/configuracion';

@Injectable()
export class ClienteService {
  private URL_API_CLIENTE:string='https://'+window.localStorage.getItem('server')+'/api/v1/cliente/';
  usuario;
  constructor(private _http:Http) {
    this.usuario =  JSON.parse(window.sessionStorage.getItem('usuario'));
  }

  listaCliente(){
    let config:Configuracion= JSON.parse(window.localStorage.getItem('configuracion'));
    return this._http.get(this.URL_API_CLIENTE+'?pais='+this.usuario.pais+'&todo='+config.soloMisClientes,{
      headers:this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  listaDireccion(cliente:Cliente){
    return this._http.get(this.URL_API_CLIENTE+'direcciones?idCliente='+cliente.Codigo+'&pais='+this.usuario.pais,{
      headers:this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  saldo(cliente:Cliente){
    return this._http.get(this.URL_API_CLIENTE+'saldo?idCliente='+cliente.Codigo+'&pais='+this.usuario.pais,{
      headers:this.bearerAccess()
    }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
  }

  detalleSaldo(cliente:Cliente){
    return this._http.get(this.URL_API_CLIENTE+'detalleSaldo?idCliente='+cliente.Codigo+'&pais='+this.usuario.pais,{
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
