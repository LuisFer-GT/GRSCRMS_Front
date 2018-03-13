import { Component } from '@angular/core';
import { NavController, NavParams, Refresher, Loading, LoadingController } from 'ionic-angular';
import { AgregarPedidoPage } from '../agregar-pedido/agregar-pedido';
import { LoginService } from '../../providers/login.service';
import { PedidoService } from '../../providers/pedido.service';
import { Pedido } from '../../model/pedido';
import { Function } from '../../utils/functions';
import { InfoPedidoPage } from '../info-pedido/info-pedido';
import { DetalleAutorizacion } from '../detalle-autorizacion/detalle-autorizacion';
import { Soporte } from './../../utils/soporte';
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {
  listaPedidos:Array<Pedido>;
  listadoEntregasAux:Array<Pedido>;
  listaAutorizaciones:Array<Pedido>=[];
  listaRechazado:Array<Pedido>=[];
  tipoTarea:string='Creado';
  busqueda:string='';
  public loading:boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private _loginService:LoginService, 
    private _pedidoService:PedidoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.listasDeDatos();
  }

  listasDeDatos(){
    let loading = this.loadingCtrl.create({
      content: "Cargando..."
    });
    loading.present();
    this._pedidoService.listarPedidosCreados(this._loginService.userLogged().codigoVendedor).then(data=>{
      let lista: Array<any> = <Array<any>> data;
      for(let item of lista){
        item.FechaVencimiento = Soporte.formattedDate3(new Date(item.FechaVencimiento));
      }
      this.listaPedidos=<Array<Pedido>>data;
      
    });

    this._pedidoService.listaPedidosCliente(this._loginService.userLogged().nombre).then(data=>{
      for(let pedido of data){
        if(pedido.estado==='Pendiente'){
          this.listaAutorizaciones.push(pedido);
        }else if(pedido.estado==='Rechazado'){
          this.listaRechazado.push(pedido);
        }
      }
      loading.dismiss();
    });
  }

  cargarFormularioNuevoPedido(){
    this.navCtrl.push(AgregarPedidoPage,{target: this});
  }

  detallePedido(item){
    this.navCtrl.push(InfoPedidoPage,{item:item});
  }

  detallePedidoAutorizacion(pedido){
    this.navCtrl.push(DetalleAutorizacion,{item:pedido});
  }

  doRefresh(refresher:Refresher){
    this.loading=true;
    this._pedidoService.listarPedidosCreados(this._loginService.userLogged().codigoVendedor).then(data=>{
      this.listaPedidos=[];

      let lista: Array<any> = <Array<any>> data;
      for(let item of lista){
        item.FechaVencimiento = Soporte.formattedDate3(new Date(item.FechaVencimiento));
      }

      this.listaPedidos=<Array<Pedido>>data;
      
      this._pedidoService.listaPedidosCliente(this._loginService.userLogged().nombre).then(data=>{
        this.listaAutorizaciones=[];
        this.listaRechazado=[];
        for(let pedido of data){
          if(pedido.estado==='Pendiente'){
            this.listaAutorizaciones.push(pedido);
          }else if(pedido.estado==='Rechazado'){
            this.listaRechazado.push(pedido);
          }
        }
        refresher.complete();
        this.loading=false;
      });

    });

  }

}
