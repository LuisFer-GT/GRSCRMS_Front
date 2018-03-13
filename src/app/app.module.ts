import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Se importa: para que funcione dentro del provider <<Http>>
import { HttpModule } from '@angular/http';

/*
 * Import pages
*/
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PedidoPage } from '../pages/pedido/pedido';
import { AgregarPedidoPage } from '../pages/agregar-pedido/agregar-pedido';
import { AutocompleteClientesPage } from '../pages/autocomplete-clientes/autocomplete-clientes';
import {AutocompleteDirecciones} from '../pages/autocomplete-direcciones/autocomplete-direcciones';
import {DetallePedidoPage} from '../pages/detalle-pedido/detalle-pedido';
import {AutocompleteArticuloPage} from '../pages/autocomplete-articulo/autocomplete-articulo';
import {DetalleArticuloPage} from '../pages/detalle-articulo/detalle-articulo';
import {InfoPedidoPage} from '../pages/info-pedido/info-pedido';
import {DetalleAutorizacion} from '../pages/detalle-autorizacion/detalle-autorizacion';
import {ConfiguracionPage} from '../pages/configuracion/configuracion';
import { ClienteDetallePage } from './../pages/cliente-detalle/cliente-detalle';
/*
 * Import Services
*/
import { LoginService } from '../providers/login.service';
import { ClienteService } from '../providers/cliente.service';
import { ArticuloService } from '../providers/articulo.service';
import { PedidoService } from '../providers/pedido.service';
import { ClientePage } from './../pages/cliente/cliente';
/*
  Pipes
*/
import { AgruparClientePipe } from '../pipe/agrupar-cliente';
import { DistinctPipe } from '../pipe/distinct';
import {SearchPipe } from '../pipe/search.pipe';
import { SearchClientePipe } from '../pipe/search-cliente.pipe';
import { SearchSaldoDetallePipe } from '../pipe/search-saldo-detalle.pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PedidoPage,
    AgregarPedidoPage,
    AutocompleteClientesPage,
    AutocompleteDirecciones,
    DetallePedidoPage,
    AutocompleteArticuloPage,
    AgruparClientePipe,
    DistinctPipe,
    DetalleArticuloPage,
    InfoPedidoPage,
    DetalleAutorizacion,
    ConfiguracionPage,
    SearchPipe,
    ClientePage,
    SearchClientePipe,
    ClienteDetallePage,
    SearchSaldoDetallePipe
  ],
  imports: [
BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PedidoPage,
    AgregarPedidoPage,
    AutocompleteClientesPage,
    AutocompleteDirecciones,
    DetallePedidoPage,
    AutocompleteArticuloPage,
    DetalleArticuloPage,
    InfoPedidoPage,
    ConfiguracionPage,
    DetalleAutorizacion,
    ClientePage,
    ClienteDetallePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    ClienteService,
    ArticuloService,
    PedidoService
  ]
})
export class AppModule {}
