import { Component } from '@angular/core';
import { NavController,NavParams,ModalController,ToastController,AlertController } from 'ionic-angular';

import {Pedido} from '../../model/pedido';
import {DetallePedido} from '../../model/detalle-pedido';
import {AutocompleteClientesPage} from '../autocomplete-clientes/autocomplete-clientes';
import {AutocompleteDirecciones} from '../autocomplete-direcciones/autocomplete-direcciones';
import {DetallePedidoPage} from '../detalle-pedido/detalle-pedido';
import {ClienteService} from '../../providers/cliente.service';

import { Soporte } from '../../utils/soporte';
import { PedidoService } from '../../providers/pedido.service';

@Component({
  selector: 'page-agregar-pedido',
  templateUrl: 'agregar-pedido.html',
})
export class AgregarPedidoPage {
  pedido:Pedido;
  nombreCliente:string='';
  direccionCliente:string='';
  detallePedido:Array<DetallePedido>=[];
  mostrarCabecera:boolean=true;
  mostrarDatos:boolean=false;
  listaSaldo;
  cliente;
  min:string='';
  max:string='';
  btnEnable:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController, public _toastController:ToastController, public _clienteService:ClienteService,public _pedidoService:PedidoService, public alertCtrl:AlertController) {
    this.pedido=new Pedido();
    this.min = new Date().toISOString();
    this.max = new Date(new Date().setFullYear(new Date().getFullYear()+1)).toISOString();
  }

  agregar(){
    this.btnEnable=true;
    this.pedido.fechaEntrega=Soporte.formattedDate(new Date());
    this.pedido.detalle = this.detallePedido;
    this.pedido.vendedor = this.cliente.Vendedor;
    if(this.detallePedido.length>0 ){
      if( this.pedido.comentario.length>=10){
        if(this.listaSaldo.length<=0){
          let prompt = this.alertCtrl.create({
            title: 'Atención',
            message: "¿Está seguro que desea guardar la información?",
            buttons: [
              {
                text: 'Cancelar',
                handler: data => {
                }
              },
              {
                text: 'Guardar',
                handler: data => {
                  this._pedidoService.agregar(this.pedido).then(data=>{
                    this._toastController.create({
                        message: data.detalle,
                      duration: 3000
                    }).present();
                  });
                  this.navCtrl.pop();
                }
              }
            ]
          });
          prompt.present();
        }else if(this.listaSaldo.length>0){
          if(Number(this.listaSaldo[0].Saldo)>=this.cliente.LimiteDeCredito || (this.pedido.total> Number(this.cliente.LimiteDeCredito)-Number(this.listaSaldo[0].Saldo)) || this.listaSaldo[0].Dias>0){

            let prompt = this.alertCtrl.create({
              title: 'Atención',
              message: "Para crear el pedido se necesita autorización, ¿Envíar pedido para autorización?",
              buttons: [
                {
                  text: 'Cancelar',
                  handler: data => {
                  }
                },
                {
                  text: 'Aceptar',
                  handler: data => {
                    this.pedido.estado = 'Pendiente';
                    this._pedidoService.autorizacion(this.pedido).then(data=>{
                      this._toastController.create({
                          message: data.detalle,
                        duration: 3000
                      }).present();
                    });
                    this.navParams.get('target').listasDeDatos();
                    this.navCtrl.pop();
                  }
                }
              ]
            });
            prompt.present();
          }else{
            this._toastController.create({
              message: "No es posible realizar la creación del pedido, contacte a creditos y facturación para mayor información.",
              duration: 3000
            }).present();
          }
        }

      }else{
        let toast = this._toastController.create({
            message: 'El comentario ingresado tiene que tener al menos 10 carácteres.',
          duration: 3000
        });
        toast.present();
      }
    }else{
      let toast = this._toastController.create({
          message: 'No se ha añadido lineas al pedido.',
        duration: 3000
      });
      toast.present();
    }
  }

  mostrarModalClientes(){
    if(this.cliente==null){
      let modal =  this.modalCtrl.create(AutocompleteClientesPage);
      let me = this;
      modal.onDidDismiss(data => {
        if(data){
          me.cliente = data;
        }
        if(me.cliente){
          me.nombreCliente=me.cliente.Cliente;
          this.pedido.cliente=me.cliente.Cliente;
          this.pedido.codigoCliente=me.cliente.Codigo;
          this.mostrarDatos=true;
          me._clienteService.saldo(me.cliente).then(data=>{
            me.listaSaldo=data;
          });
        }
      });
      modal.present();
    }else{
      let toast = this._toastController.create({
        message: 'El cliente ya fue seleccionado.',
        duration: 3000
      });
      toast.present();
    }
  }

  mostrarModalDirecciones(){
    let modal = this.modalCtrl.create(AutocompleteDirecciones,{cliente:this.cliente});
    let me = this;
    modal.onDidDismiss(data => {
      if(data)
        me.pedido.direccionEntrega = data.Address;
      if(me.pedido.direccionEntrega){
        me.direccionCliente=me.pedido.direccionEntrega;
      }
    });
    modal.present();
  }

  agregarLineaDetalle(){
    if(this.cliente){
      let modal = this.modalCtrl.create(DetallePedidoPage,{cliente:this.cliente});
      let me = this;
      modal.onDidDismiss(data => {
        if(data){
          data.precio = Math.round(data.precio * 100) / 100;
          me.detallePedido.push(data);
          this.pedido.total+=Number(data.precio)*Number(data.cantidad);
        }
      });
      modal.present();
    }else{
      //Mostrar alerta
      let toast = this._toastController.create({
        message: 'Por favor selecciona un cliente para agregar líneas al pedido.',
        duration: 3000
      });
      toast.present();
    }
  }

  eliminarLineaDetalle(item){
    this.pedido.total-=Number(item.precio)*Number(item.cantidad);
    this.detallePedido.splice(this.detallePedido.indexOf(item),1);
  }

}
