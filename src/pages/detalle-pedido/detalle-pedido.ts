import { Component } from '@angular/core';
import { ViewController,NavController,NavParams,ModalController, ToastController } from 'ionic-angular';
import {AutocompleteArticuloPage} from '../autocomplete-articulo/autocomplete-articulo';
import { Cliente } from '../../model/cliente';
import { DetallePedido } from '../../model/detalle-pedido';
@Component({
  selector: 'page-detalle-pedido',
  templateUrl: 'detalle-pedido.html',
})
export class DetallePedidoPage {
  cliente:Cliente;
  detalle:DetallePedido;
  articuloSeleccionado:string="";
  articulo;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController, public viewCtrl:ViewController, public _toastController: ToastController) {
    this.cliente=navParams.get("cliente");
    this.detalle=new DetallePedido();
  }

  ionViewDidLoad() {
  }

  agregar(){
    if(Number(this.detalle.cantidad)){
      if(Number(this.detalle.promocional)==1){
        this.detalle.promocional='Si';
      }else{
        this.detalle.promocional='No';
      }
      this.viewCtrl.dismiss(this.detalle);
    }else{
      let toast = this._toastController.create({
        message: 'La cantidad de unidades a despachar no puede ser cero.',
        duration: 3000
      });
      toast.present();
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  mostrarModalArticulos(){
    let modal = this.modalCtrl.create(AutocompleteArticuloPage,{cliente:this.cliente});
    let me = this;
    modal.onDidDismiss(data => {
      if(data){
          this.articulo= data;
          this.detalle.articulo=data.Articulo;
          this.detalle.precio = data.Precio;
          this.articuloSeleccionado= data.Articulo;
      }
    });
    modal.present();
  }

}
