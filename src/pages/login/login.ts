import { Component } from '@angular/core';
import { NavController,NavParams,AlertController,ToastController } from 'ionic-angular';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../providers/login.service';
import { HomePage } from '../../pages/home/home';
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
          });
          this.navCtrl.setRoot(HomePage);
        }else{
          this.toastCtrl.create({
             message: '¡Verifique sus credenciales!',
             duration: 3000
           }).present();
        }
      });
    }else{
      this.toastCtrl.create({
         message: '¡Para ingresar es necesario tener credenciales!',
         duration: 3000,
         position: 'bottom'
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
