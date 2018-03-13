import { Component } from '@angular/core';
import {ViewController,  NavController,NavParams, LoadingController } from 'ionic-angular';
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
    private _clienteService: ClienteService,
    public loadingCtrl: LoadingController
  ) {
    this.listarClientes();
  }

  listarClientes(){
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loading.present();
    this._clienteService.listaCliente().then(result => {
      this.listaCliente = result;
      loading.dismiss();
    });
  }
  mostrarDetalle(item){
    this.navCtrl.push(ClienteDetallePage,{item:item});
  }
}
