import { Component,NgZone } from '@angular/core';
import { ViewController,NavController,NavParams } from 'ionic-angular';
import { ClienteService } from '../../providers/cliente.service';
@Component({
  selector: 'page-autocomplete-clientes',
  templateUrl: 'autocomplete-clientes.html',
})
export class AutocompleteClientesPage {
  autocompleteItems;
  autocomplete:{query:string};
  listado;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, private _clienteService:ClienteService,private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    this.listarTodos();
  }

  listarTodos(){
    this._clienteService.listaCliente().then(data=>{
      this.autocompleteItems = data;
      this.listado=data;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  seleccionarItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  actualizarBusqueda(){
    if(this.autocomplete.query === '') {
      this.autocompleteItems = this.listado;
      return;
    }
    let me = this;
    this.autocompleteItems = this.listado;
      me.zone.run(()=>{
          me.autocompleteItems = me.autocompleteItems.filter(item => item.Cliente.toLowerCase().match(new RegExp(this.autocomplete.query.toLowerCase(),'i')));
      });


  }

}
