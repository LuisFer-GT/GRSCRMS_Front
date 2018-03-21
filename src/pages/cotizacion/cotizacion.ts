import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Refresher, AlertController, ToastController } from 'ionic-angular';
import { AgregarCotizacionPage } from './../agregar-cotizacion/agregar-cotizacion';
import { Cotizacion } from './../../model/cotizacion';
import { CotizacionService } from '../../providers/cotizacion.service';
import { InfoCotizacionPage } from '../info-cotizacion/info-cotizacion';
import { AgregarPedidoPage } from './../agregar-pedido/agregar-pedido';

@Component({
  selector: 'page-cotizacion',
  templateUrl: 'cotizacion.html',
})
export class CotizacionPage {
  listarCotizaciones:Array<Cotizacion>;
  busqueda:string;
  loading:boolean;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _cotizacionService:CotizacionService,
    public loadingCtrl: LoadingController, 
    public alertCtrl:AlertController, 
    public _toastController:ToastController) {
    this.listasDeDatos();
  } 
  listasDeDatos(){
    this.listarCotizaciones=null;
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loading.present();
    this._cotizacionService.list().then(result=>{
      this.listarCotizaciones=result;
      loading.dismiss();
    });
  }
  detalleCotizacion(cotizacion:Cotizacion){
    this.navCtrl.push(InfoCotizacionPage,{item:cotizacion});
  }
  cargarFormularioNuevaCotizacion(){
    this.navCtrl.push(AgregarCotizacionPage,{target: this});
  }
  crearPedido(cotizacion){
    this.navCtrl.push(AgregarPedidoPage,{target: this,cotizacion: cotizacion});
  }
  doRefresh(refresher:Refresher){
    this.loading=true;
    this._cotizacionService.list().then(result=>{
      this.listarCotizaciones=result;
      refresher.complete();
      this.loading=false;
    });
  }
  eliminarCotizacion(cotizacion:Cotizacion){
    let prompt = this.alertCtrl.create({
      title: 'Atención',
      message: "Esta acción eliminará completamente la cotización seleccioanda, ¿Quiere continuar?",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
           cotizacion.estado='Eliminada';
           this._cotizacionService.edit(cotizacion).then(result=>{
              this.listasDeDatos();
              this._toastController.create({
                message: 'La cotización fue eliminada.',
                duration: 5000,
                position: 'top'
              }).present();
           });
          }
        }
      ]
    });
    prompt.present();
  }
  editarCotizacion(cotizacion:Cotizacion){
    this.navCtrl.push(AgregarCotizacionPage, {item:cotizacion,target:this});
  }
}
