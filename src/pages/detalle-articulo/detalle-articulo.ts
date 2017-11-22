import { Component } from '@angular/core';
import {ViewController, NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detalle-articulo',
  templateUrl: 'detalle-articulo.html',
})
export class DetalleArticuloPage {
  detalle;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detalle=navParams.get("detalle");
  }

}
