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
import { ClientePage } from './../pages/cliente/cliente';
import { CotizacionPage } from './../pages/cotizacion/cotizacion';
import { AgregarCotizacionPage } from './../pages/agregar-cotizacion/agregar-cotizacion';
import { InfoCotizacionPage } from './../pages/info-cotizacion/info-cotizacion';
/*
 * Import Services
*/
import { LoginService } from '../providers/login.service';
import { ClienteService } from '../providers/cliente.service';
import { ArticuloService } from '../providers/articulo.service';
import { PedidoService } from '../providers/pedido.service';
import { CotizacionService } from '../providers/cotizacion.service';
/*
  Pipes
*/
import { AgruparClientePipe } from '../pipe/agrupar-cliente';
import { DistinctPipe } from '../pipe/distinct';
import {SearchPipe } from '../pipe/search.pipe';
import { SearchClientePipe } from '../pipe/search-cliente.pipe';
import { SearchSaldoDetallePipe } from '../pipe/search-saldo-detalle.pipe';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { DetalleCotizacionPage } from '../pages/detalle-cotizacion/detalle-cotizacion';
import { SearchCotizacionPipe } from '../pipe/search-cotizacion.pipe';

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
    SearchSaldoDetallePipe,
    CotizacionPage,
    AgregarCotizacionPage,
    DetalleCotizacionPage,
    InfoCotizacionPage,
    SearchCotizacionPipe
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
    ClienteDetallePage,
    CotizacionPage,
    AgregarCotizacionPage,
    DetalleCotizacionPage,
    InfoCotizacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    ClienteService,
    ArticuloService,
    PedidoService,
    File,
    FileOpener,
    CotizacionService
  ]
})
export class AppModule {}
