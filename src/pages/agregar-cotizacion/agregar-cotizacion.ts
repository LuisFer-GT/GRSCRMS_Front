import { Component } from '@angular/core';
import { NavController,NavParams, ModalController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { CotizacionPage } from './../cotizacion/cotizacion';
import { DetalleCotizacion } from './../../model/detalle-cotizacion';
import { ClienteService } from '../../providers/cliente.service';
import { Cotizacion } from '../../model/cotizacion';
import { DetalleCotizacionPage } from '../detalle-cotizacion/detalle-cotizacion';
import { AutocompleteDirecciones } from './../autocomplete-direcciones/autocomplete-direcciones';
import { AutocompleteClientesPage } from './../autocomplete-clientes/autocomplete-clientes';
import { CotizacionService } from '../../providers/cotizacion.service';
import { Soporte } from './../../utils/soporte';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'page-agregar-cotizacion',
  templateUrl: 'agregar-cotizacion.html',
})
export class AgregarCotizacionPage {
  cotizacion:Cotizacion;
  nombreCliente:string='';
  direccionCliente:string='';
  detalleCotizacion:Array<DetalleCotizacion>=[];
  mostrarCabecera:boolean=true;
  mostrarDatos:boolean=false;
  listaSaldo;
  cliente;
  min:string='';
  max:string='';
  btnEnable:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController, public _toastController:ToastController, public _clienteService:ClienteService, public alertCtrl:AlertController, public _cotizacionService:CotizacionService, public loadingCtrl: LoadingController) {
    this.cotizacion=new Cotizacion();
    let comodin:Date = new Date();
    comodin.setDate(comodin.getDate()+1)
    this.min = comodin.toISOString();
    this.cotizacion.fechaEntrega = comodin.toISOString();
    this.max = new Date(new Date().setFullYear(new Date().getFullYear()+1)).toISOString();
    if(this.navParams.get('item')){
      const cotizacion2 = this.navParams.get('item');
      let fechaEntrega = cotizacion2.fechaEntrega.split('/');
      let fech = fechaEntrega[1]+'/'+fechaEntrega[0]+'/'+fechaEntrega[2];
      this.nombreCliente = cotizacion2.cliente;
      this.cliente = new Cliente();
      this.cliente.Cliente = cotizacion2.cliente;
      this.cliente.Codigo = cotizacion2.codigoCliente;
      this.direccionCliente = cotizacion2.direccionEntrega || '';
      this.cotizacion.cliente = cotizacion2.cliente;
      this.cotizacion.codigoCliente = cotizacion2.codigoCliente;
      this.cotizacion.direccionEntrega = cotizacion2.direccionEntrega;
      this.cotizacion.comentario = cotizacion2.comentario;
      this.cotizacion.cuenta = cotizacion2.cuenta;
      this.cotizacion.fechaEntrega = new Date(fech).toISOString();
      this.cotizacion.estado = 'Activa';
      this.cotizacion.talonarioDePedido = cotizacion2.talonarioDePedido;
      this.cotizacion.total = cotizacion2.total;
      this.cotizacion.vendedor = cotizacion2.vendedor;
      this.mostrarDatos = true;
      this.cotizacion.idCotizacion = cotizacion2.idCotizacion;
      this._clienteService.saldo(this.cliente).then(data=>{
        if(data.length>0){
          this.cliente.ListaDePrecios = data[0].Grupo_Nombre; 
        }
      });
      this._cotizacionService.listaDetalle(cotizacion2.idCotizacion).then(result=>{
        for(let item of result){
         delete item.cotizacion.usuario.authorities;
        }
        this.detalleCotizacion = result;
        this.cotizacion.detalle = result;
      });
    }
  }
  agregar(){
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loading.present();
    this.btnEnable=true;
    if(this.cotizacion.fechaEntrega.includes('-')){
      this.cotizacion.fechaEntrega = ""+(Soporte.formattedDate3(new Date(this.cotizacion.fechaEntrega)));
    }
    this.cotizacion.detalle = this.detalleCotizacion;
    this.cotizacion.vendedor = this.cliente.Vendedor;
    this.cotizacion.estado = 'Activo';
    let comodin:Date = new Date();
    comodin.setDate(comodin.getDate()+30);
    this.cotizacion.fechaVencimiento = Soporte.formattedDate3(comodin);
    if(this.detalleCotizacion.length>0 ){
      this._cotizacionService.add(this.cotizacion).then( result => {
        loading.dismiss();
        let toast = this._toastController.create({
          message: result.detalle,
          duration: 6000,
          position: 'top'
        });
        toast.present();
        this.navParams.get('target').listasDeDatos();
        this.navCtrl.pop();
      }).catch(err=>{
        let toast = this._toastController.create({
          message: 'Error al agregar cotización, comunicate a IT para identificar el inconveniente.',
          duration: 6000,
          position: 'top'
        });
        toast.present();
      });
    }else{
      let toast = this._toastController.create({
          message: 'No se ha añadido líneas al pedido.',
        duration: 6000,
        position: 'top'
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
          this.cotizacion.cliente=me.cliente.Cliente;
          this.cotizacion.codigoCliente=me.cliente.Codigo;
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
        me.cotizacion.direccionEntrega = data.Address;
      if(me.cotizacion.direccionEntrega){
        me.direccionCliente=me.cotizacion.direccionEntrega;
      }
    });
    modal.present();
  }

  agregarLineaDetalle(){
    if(this.cliente){
      let modal = this.modalCtrl.create(DetalleCotizacionPage,{cliente:this.cliente});
      let me = this;
      modal.onDidDismiss(data => {
        if(data){
          data.precio = Math.round(data.precio * 100) / 100;
          me.detalleCotizacion.push(data);
          this.cotizacion.total+=Number(data.precio)*Number(data.cantidad);
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
            this.cotizacion.total-=Number(item.precio)*Number(item.cantidad);
            this.detalleCotizacion.splice(this.detalleCotizacion.indexOf(item),1);
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
      let modal = this.modalCtrl.create(DetalleCotizacionPage,{cliente:this.cliente,detalle: item});
      let me = this;
      modal.onDidDismiss(data => {
        if(data){
          data.precio = Math.round(data.precio * 100) / 100;
          this.cotizacion.total-= (Number(precio)*Number(cantidad));
          this.cotizacion.total+=Number(data.precio)*Number(data.cantidad);
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
