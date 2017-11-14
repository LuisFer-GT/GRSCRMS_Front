import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../providers/login.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario;
  constructor(
    public navCtrl: NavController,
    private _loginService:LoginService
  ){
    this.usuario=_loginService.userLogged();
  }



  ionViewCanEnter() {
     return this._loginService.isAuthenticated;
   }

}
