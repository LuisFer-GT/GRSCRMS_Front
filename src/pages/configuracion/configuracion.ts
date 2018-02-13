import { Component } from '@angular/core';
import {ViewController, NavController,NavParams } from 'ionic-angular';
import { Configuracion } from '../../model/configuracion';

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {
  public configuracion:Configuracion;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    if(window.localStorage.getItem("configuracion")!=null){
      this.configuracion = JSON.parse(window.localStorage.getItem("configuracion"));
    }else{
      this.configuracion.soloMisClientes=true;
      window.localStorage.setItem('configuracion',JSON.stringify(this.configuracion));
    }
  }

  ionViewDidLoad() {

  }
  cambiarConfigSoloMisClientes(){
    this.configuracion.soloMisClientes=!this.configuracion.soloMisClientes;
    window.localStorage.removeItem('configuracion');
    window.localStorage.setItem('configuracion',JSON.stringify(this.configuracion));
  }
}
