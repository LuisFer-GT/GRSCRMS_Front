import { Component } from '@angular/core';
import {ViewController, NavController,NavParams } from 'ionic-angular';
import { ClienteService } from './../../providers/cliente.service';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'page-cliente-detalle',
  templateUrl: 'cliente-detalle.html',
})
export class ClienteDetallePage {
  cliente;
  clienteSaldoTotal;
  clienteDetalleSaldo;
  busqueda:string;
  mostrar: boolean = true;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _clienteService: ClienteService) {
      this.cliente = this.navParams.get('item');
      this._clienteService.saldo(this.cliente).then(result => {
        if ( result.length>0 ) {
          this.clienteSaldoTotal = result;
          this._clienteService.detalleSaldo(this.cliente).then(detalle => {
            if(detalle.length>0){
              this.clienteDetalleSaldo = detalle;
            }
          });
        }
      });
  }
}
