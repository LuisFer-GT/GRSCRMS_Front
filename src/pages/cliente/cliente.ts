import { Component } from '@angular/core';
import {ViewController, NavController,NavParams } from 'ionic-angular';
import { ClienteService } from './../../providers/cliente.service';
import { Cliente } from '../../model/cliente';
import { ClienteDetallePage } from '../cliente-detalle/cliente-detalle';

@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {
  listaCliente:Cliente;
  busqueda:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _clienteService: ClienteService
  ) {
    this.listarClientes();
  }

  listarClientes(){
    this._clienteService.listaCliente().then(result => {
      this.listaCliente = result;
    });
  }
  mostrarDetalle(item){
    this.navCtrl.push(ClienteDetallePage,{item:item});
  }
}
