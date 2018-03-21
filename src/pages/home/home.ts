import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../providers/login.service';
import {Slides} from 'ionic-angular'
import { ClientePage } from './../cliente/cliente';
import { PedidoPage } from './../pedido/pedido';
import { ConfiguracionPage } from './../configuracion/configuracion';
import { CotizacionPage } from './../cotizacion/cotizacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario;
  @ViewChild(Slides) slides:Slides;
  slideOptions = {
    pager:false,
    control: false
  };
  constructor(
    public navCtrl: NavController,
    private _loginService:LoginService
  ){
    this.usuario=_loginService.userLogged();

  }

  ionViewCanEnter() {
    return this._loginService.isAuthenticated;
  }

  abrirPagina(pagina:string){
    if(pagina==='clientes'){
      this.navCtrl.setRoot(ClientePage);
    }else if(pagina==='pedidos'){
      this.navCtrl.setRoot(PedidoPage);
    }else if(pagina==='configuracion'){
      this.navCtrl.setRoot(ConfiguracionPage);
    }else if(pagina==='cotizacion'){
      this.navCtrl.setRoot(CotizacionPage);
    }
  }
}
