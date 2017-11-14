import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AgregarPedidoPage } from '../agregar-pedido/agregar-pedido';
import { LoginService } from '../../providers/login.service';
import { PedidoService } from '../../providers/pedido.service';
import { Pedido } from '../../model/pedido';
import { Function } from '../../utils/functions';
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {
  listaPedidos:Array<Pedido>;
  listadoEntregasAux:Array<Pedido>;
  tipoTarea:string='Creado';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, private _loginService:LoginService, private _pedidoService:PedidoService) {

    _pedidoService.listarPedidosCreados(_loginService.userLogged().codigoVendedor).then(data=>{
      this.listaPedidos=<Array<Pedido>>data;
      this.listadoEntregasAux=data;
      this.listadoEntregasAux=Function.distinct(this.listadoEntregasAux);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pedido');
  }

  cargarFormularioNuevoPedido(){
    this.navCtrl.push(AgregarPedidoPage);
  }

}
