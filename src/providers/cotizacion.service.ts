import { Injectable } from '@angular/core';
import { Http,Headers,Response} from '@angular/http';
import { Observable } from "rxjs";
import  "rxjs/add/operator/toPromise";
import { Cotizacion } from './../model/cotizacion';

@Injectable()
export class CotizacionService {
    private URL_API_COTIZACION:string='https://'+window.localStorage.getItem('server')+'/api/v1/cotizacion';
    usuario;
    constructor(private _http:Http){
        this.usuario =  JSON.parse(window.sessionStorage.getItem('usuario'));
        delete this.usuario.authorities;
    }
    add(cotizacion:Cotizacion){
        cotizacion.usuario = this.usuario;
        delete cotizacion.usuario.authorities;
        return this._http.post(this.URL_API_COTIZACION, cotizacion, {
            headers: this.bearerAccess()
        }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
    }
    list(){
        return this._http.get(this.URL_API_COTIZACION,{
            headers: this.bearerAccess()
        }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
    }
    edit(cotizacion:Cotizacion){
        cotizacion.usuario = this.usuario;
        delete cotizacion.usuario.authorities;
        return this._http.put(this.URL_API_COTIZACION, cotizacion ,{
            headers: this.bearerAccess()
        }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
    }
    delete(id:number){
        return this._http.delete(this.URL_API_COTIZACION+'?idCotizacion='+id,{
            headers:this.bearerAccess()
        }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
    }
    listaDetalle(idCotizacion:number){
        return this._http.get(this.URL_API_COTIZACION+'/detalle?idCotizacion='+idCotizacion,{
            headers:this.bearerAccess()
        }).toPromise().then(this.extractData).catch(this.handleErrorObservable);
    }
    obtenerImpuestos(){
        return this._http.get(this.URL_API_COTIZACION+'/impuestos?pais='+this.usuario.pais,{
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