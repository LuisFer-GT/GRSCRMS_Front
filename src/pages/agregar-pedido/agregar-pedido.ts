import { Component } from '@angular/core';
import { NavController,NavParams,ModalController,ToastController,AlertController, LoadingController } from 'ionic-angular';

import {Pedido} from '../../model/pedido';
import {DetallePedido} from '../../model/detalle-pedido';
import {AutocompleteClientesPage} from '../autocomplete-clientes/autocomplete-clientes';
import {AutocompleteDirecciones} from '../autocomplete-direcciones/autocomplete-direcciones';
import {DetallePedidoPage} from '../detalle-pedido/detalle-pedido';
import {ClienteService} from '../../providers/cliente.service';

import { Soporte } from '../../utils/soporte';
import { PedidoService } from '../../providers/pedido.service';
import { Cotizacion } from './../../model/cotizacion';
import { Cliente } from '../../model/cliente';
import { CotizacionService } from './../../providers/cotizacion.service';

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
  listaSaldo=[];
  cliente;
  cotizacion;
  min:string='';
  max:string='';
  cotizacionActual:Cotizacion;
  btnEnable:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController, public _toastController:ToastController, public _clienteService:ClienteService,public _pedidoService:PedidoService, public alertCtrl:AlertController, public _cotizacionService:CotizacionService,public loadingCtrl: LoadingController) {
    this.pedido=new Pedido();
    if(navParams.get('cotizacion')){
      this.cotizacion= <Cotizacion> navParams.get('cotizacion');
      let fechaEntrega = this.cotizacion.fechaEntrega.split('/');
      let fech = fechaEntrega[1]+'/'+fechaEntrega[0]+'/'+fechaEntrega[2];
      this.cotizacionActual= this.cotizacion;
      this.nombreCliente = this.cotizacion.cliente;
      this.direccionCliente = this.cotizacion.direccionEntrega || '';
      this.pedido.cliente = this.cotizacion.cliente;
      this.pedido.codigoCliente = this.cotizacion.codigoCliente;
      this.pedido.direccionEntrega = this.cotizacion.direccionEntrega;
      this.pedido.comentario =this.cotizacion.comentario;
      this.pedido.cuenta =this.cotizacion.cuenta;
      this.pedido.fechaEntrega = new Date(fech).toISOString();
      this.pedido.estado = 'Pendiente';
      this.pedido.talonarioDePedido = this.cotizacion.talonarioDePedido;
      this.pedido.total = this.cotizacion.total;
      this.pedido.vendedor = this.cotizacion.vendedor;
      this.mostrarDatos=true;
      let miCliente: Cliente = new Cliente();
      miCliente.Codigo= this.cotizacion.codigoCliente;
      miCliente.Cliente = this.cotizacion.cliente;
      this.cliente = miCliente;
      this._clienteService.saldo(miCliente).then(data=>{
        if(data.length>0){
          this.listaSaldo=data;
          this.cliente.ListaDePrecios = data[0].Grupo_Nombre; 
        }
      });
      _cotizacionService.listaDetalle(this.cotizacion.idCotizacion).then(result =>{
        if(result.length>0){
          this.cliente.LimiteDeCredito = result[0].LimiteCredito;
        }
        this.detallePedido = result;
      });
    }
    let comodin:Date = new Date();
    comodin.setDate(comodin.getDate()+1)
    this.min = comodin.toISOString();
    this.pedido.fechaEntrega = comodin.toISOString();
    this.max = new Date(new Date().setFullYear(new Date().getFullYear()+1)).toISOString();
  }

  agregar(){
    this.btnEnable=true;
    if(this.cliente.Vendedor){
      this.pedido.vendedor = this.cliente.Vendedor;
    }
    if(this.detallePedido.length>0 ){
      if( this.pedido.comentario.length>=10 ){
        if(this.direccionCliente.length>0){
          if(this.pedido.fechaEntrega.includes('-')){
            this.pedido.fechaEntrega = ""+(Soporte.formattedDate3(new Date(this.pedido.fechaEntrega)));
          }
          this.pedido.detalle = this.detallePedido;
          if(this.listaSaldo.length<=0){
            this.crearPedidoSinAutorizacion();
          }else if(this.listaSaldo.length>0){
            /*if(Number(this.listaSaldo[0].Saldo)>=this.cliente.LimiteDeCredito || (this.pedido.total> Number(this.cliente.LimiteDeCredito)-Number(this.listaSaldo[0].Saldo)) || this.listaSaldo[0].Dias>0){
            }*/
            if(((this.pedido.total<= Number(this.cliente.LimiteDeCredito)-Number(this.listaSaldo[0].Saldo)) && this.listaSaldo[0].Dias<=15)){
              this.crearPedidoSinAutorizacion();  
            }else{
              this.crearPedidoConAutorizacion();
              /*this._toastController.create({
                message: "No es posible realizar la creación del pedido, contacte a creditos y facturación para mayor información.",
                duration: 3000
              }).present();*/
            }
          }
        }else{
          let toast = this._toastController.create({
            message: 'Por favor selecciona una dirección.',
            duration: 6000,
            position: 'top'
          });
          toast.present();
        }
      }else{
        let toast = this._toastController.create({
            message: 'El comentario ingresado tiene que tener al menos 10 carácteres.',
          duration: 6000,
          position: 'top'
        });
        toast.present();
      }
    }else{
      let toast = this._toastController.create({
          message: 'No se ha añadido lineas al pedido.',
        duration: 6000,
        position: 'top'
      });
      toast.present();
    }
  }
  
  crearPedidoConAutorizacion(){
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
            let loading = this.loadingCtrl.create({
              content: "Cargando..."
            });
            loading.present();
            this._pedidoService.autorizacion(this.pedido).then(data=>{
              loading.dismiss();
              if(this.cotizacionActual){
                this.cotizacionActual.estado = 'Inactivo';
                this._cotizacionService.edit(this.cotizacionActual).then(result=>{
                  this.navParams.get('target').listasDeDatos();
                });
              }
              this.navParams.get('target').listasDeDatos();
              this.navCtrl.pop();
              this._toastController.create({
                message: data.detalle,
                duration: 6000,
                position: 'top'
              }).present();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  crearPedidoSinAutorizacion(){
    let prompt = this.alertCtrl.create({
      title: 'Atención',
      message: "El pedido se creará sin autorización ¿está seguro que desea continuar?",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: "Cargando..."
            });
            loading.present();
            this._pedidoService.agregar(this.pedido).then(data=>{
              if(this.cotizacionActual){
                this.cotizacionActual.estado = 'Inactivo';
                this._cotizacionService.edit(this.cotizacionActual).then(result=>{
                });
              }
              loading.dismiss();
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
        duration: 6000,
        position: 'top'
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
        duration: 6000,
        position: 'top'
      });
      toast.present();
    }
  }

  eliminarLineaDetalle(item){
    let prompt = this.alertCtrl.create({
      title: 'Atención',
      message: "¿Esta seguro que desea eliminar la línea del pedido?",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.pedido.total-=Number(item.precio)*Number(item.cantidad);
            this.detallePedido.splice(this.detallePedido.indexOf(item),1);
            this._toastController.create({
              message: "La línea del pedido ha sido eliminada",
              duration: 6000,
              position: 'top'
            }).present();
          }
        }
      ]
    });
    prompt.present();
  }

  editarLineaDetalle(item){
    let precio = item.precio;
    let cantidad = item.cantidad;
    if(this.cliente){
      let modal = this.modalCtrl.create(DetallePedidoPage,{cliente:this.cliente,detalle: item});
      let me = this;
      modal.onDidDismiss(data => {
        if(data){
          data.precio = Math.round(data.precio * 100) / 100;
          this.pedido.total-= (Number(precio)*Number(cantidad));
          this.pedido.total+=Number(data.precio)*Number(data.cantidad);
        }
      });
      modal.present();
    }else{
      //Mostrar alerta
      let toast = this._toastController.create({
        message: 'Por favor selecciona un cliente para editar líneas al pedido.',
        duration: 6000,
        position: 'top'
      });
      toast.present();
    }
  }
}
