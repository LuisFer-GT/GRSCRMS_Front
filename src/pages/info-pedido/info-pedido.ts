import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { PedidoService } from '../../providers/pedido.service';
import { DetallePedido } from '../../model/detalle-pedido';
@Component({
  selector: 'page-info-pedido',
  templateUrl: 'info-pedido.html',
})
export class InfoPedidoPage {
  listaDetalle:Array<DetallePedido>;
  cabecera;
  total;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _pedidoService:PedidoService) {
    this.cabecera =this.navParams.get('item');
    this._pedidoService.listaDetallePedidoCreado(this.cabecera.DocEntry).then(data=>{
      this.total = 0;
      for(let detalle of data){
        this.total += Number(detalle.Price);
      }
      this.listaDetalle = data;
    });
  }
}
