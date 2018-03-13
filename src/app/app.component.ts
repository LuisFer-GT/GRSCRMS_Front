import { Component,ViewChild,NgZone } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginService } from '../providers/login.service';
//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PedidoPage } from '../pages/pedido/pedido';
import { Usuario } from '../model/usuario';
import { ConfiguracionPage } from './../pages/configuracion/configuracion';
import { Configuracion } from '../model/configuracion';
import { ClientePage } from './../pages/cliente/cliente';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  paginas:Array<{titulo:string,component:any,icon:any}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private _loginService:LoginService,private zone:NgZone) {
    if(this._loginService.isAuthenticated()){
      this.rootPage = PedidoPage;
    }else{
        this.rootPage= LoginPage;
    }
    if(window.localStorage.getItem("configuracion")==null){
      let configuracion:Configuracion=new Configuracion();
      configuracion.soloMisClientes=true;
      window.localStorage.setItem('configuracion',JSON.stringify(configuracion));
    }
    
    this.paginas=[
      //{titulo:'Home',component:HomePage,icon:'home'},
      {titulo:'Pedidos',component:PedidoPage,icon:'md-list-box'},
      {titulo:'Clientes', component: ClientePage,icon: 'md-people'},
      {titulo:'Configuración',component: ConfiguracionPage, icon: 'md-cog'}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }

  abrirPagina(pagina){
     this.nav.setRoot(pagina.component);
   }

   logout(){
     this._loginService.logout();
     window.location.reload();
   }
}
