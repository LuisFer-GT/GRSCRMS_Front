import { Component,NgZone } from '@angular/core';
import { NavController,NavParams, LoadingController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { ClienteService } from '../../providers/cliente.service';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'page-autocomplete-direcciones',
  templateUrl: 'autocomplete-direcciones.html',
})
export class AutocompleteDirecciones {
  autocompleteItems;
  autocomplete:{query:string};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl:ViewController, 
    private _clienteService:ClienteService,
    private zone: NgZone,
    public loadingCtrl: LoadingController) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    this.actualizarBusqueda();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  seleccionarItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  actualizarBusqueda(){
    let me = this;
    let loading = this.loadingCtrl.create({
      content:"Cargando direcciones..."
    });
    loading.present();
    this._clienteService.listaDireccion(<Cliente>this.navParams.get('cliente')).then(data=>{
      me.autocompleteItems = [];
      me.zone.run(()=>{
          me.autocompleteItems = data.filter(item => item.Address.toLowerCase().startsWith(this.autocomplete.query.toLowerCase()));
      });
      loading.dismiss();
    });
  }

}
