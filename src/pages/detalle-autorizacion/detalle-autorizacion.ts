import { Component } from '@angular/core';
import {ViewController, NavController,NavParams } from 'ionic-angular';
import { PedidoService } from '../../providers/pedido.service';
import { Soporte } from '../../utils/soporte';
@Component({
  selector: 'page-detalle-autorizacion',
  templateUrl: 'detalle-autorizacion.html',
})
export class DetalleAutorizacion {
  cabecera;
  listaDetalle;
  total:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _pedidoService:PedidoService) {
    this.cabecera = this.navParams.get('item');
    _pedidoService.listaDetalleAutorizacion(this.cabecera).then(data=>{
      this.listaDetalle = data;
      for(let detalle of data){
        this.total+=Number(detalle.precio);
      }
    });
  }
}
