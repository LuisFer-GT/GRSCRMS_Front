import { Component,NgZone } from '@angular/core';
import {ViewController, NavController,NavParams, LoadingController } from 'ionic-angular';
import {ArticuloService} from '../../providers/articulo.service';
import {DetalleArticuloPage} from '../detalle-articulo/detalle-articulo';

@Component({
  selector: 'page-autocomplete-articulo',
  templateUrl: 'autocomplete-articulo.html',
})
export class AutocompleteArticuloPage {
  autocompleteItems;
  autocomplete:{query:string};
  listado;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl:ViewController, 
    private _articuloService:ArticuloService,
    private zone: NgZone,
    public loadingCtrl: LoadingController) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    this.listarArticulos();
  }

  listarArticulos(){
    let loading = this.loadingCtrl.create({
      content:"Cargando artículos..."
    });
    loading.present();
    this._articuloService.listaArticulos(this.navParams.get("cliente")).then(data=>{
      this.autocompleteItems = data;
      this.listado = data;
      loading.dismiss();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  seleccionarItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  actualizarBusqueda(){
    if(this.autocomplete.query === ''){
      this.autocompleteItems = this.listado;
      return;
    }
    let me = this;
    this.autocompleteItems = this.listado;
    this.zone.run(()=>{
        me.autocompleteItems = this.autocompleteItems.filter(item => item.Articulo.toLowerCase().match(new RegExp(this.autocomplete.query.toLowerCase(),'i')));
    });
  }

  detalles(item){
    this._articuloService.detalle(item.Articulo).then(detalle=>{
      this.navCtrl.push(DetalleArticuloPage,{detalle: detalle[0]})
    });
  }

}
