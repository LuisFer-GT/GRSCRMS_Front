import { Component } from '@angular/core';
import { NavController,NavParams,AlertController,ToastController } from 'ionic-angular';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../providers/login.service';
import { PedidoPage } from '../../pages/pedido/pedido';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private usuario:Usuario=new Usuario();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _loginService:LoginService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.usuario= new Usuario();
  }

  ionViewCanEnter() {
    return !this._loginService.isAuthenticated();
  }

  login(){
    if(this.usuario.username && this.usuario.password){
      this._loginService.login(this.usuario.username,this.usuario.password).then(data=>{
        if(data){
          this._loginService.userInfo().then(info=>{
            window.sessionStorage.setItem('usuario',JSON.stringify(info));
            if(info.authorities[0].authority==='ROL_SALE'){
              this.navCtrl.setRoot(PedidoPage);
            }else if(info.authorities[0].authority!=='ROL_SALE'){
              this.toastCtrl.create({
                 message: '¡Al parecer no tienes acceso a esta aplicación, contacta a tu administrador!',
                 duration: 5000
               }).present();
            }
          });
        }else{
          this.toastCtrl.create({
             message: '¡Verifique sus credenciales!',
             duration: 6000,
             position: 'top'
           }).present();
        }
      });
    }else{
      this.toastCtrl.create({
         message: '¡Para ingresar es necesario tener credenciales!',
         duration: 6000,
         position: 'top'
       }).present();
    }

  }

  public serverPrompt(){
    this.alertCtrl.create({
      title:'Dirección de Servidor',
      message:'Por favor ingrese la dirección del servidor',
      inputs:[
        {
          name:'direccion',
          placeholder:'Ingrese dirección IP',
          value: window.localStorage.getItem('server')
        }
      ],
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          handler: data=>{
          }
        },
        {
          text:"Guardar",
          handler:data=>{
            window.localStorage.setItem('server',data.direccion);
          }
        }
      ]
    }).present();
  }


}
