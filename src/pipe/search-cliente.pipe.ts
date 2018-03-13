import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchCliente pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchCliente',
})
export class SearchClientePipe implements PipeTransform {


  transform(lista:Array<any>, filtro:string):Array<any> {
    let listaCoincidencias:Array<any>=new Array<any>();
    if(!filtro){
      return lista;
    }
    lista.forEach((item)=>{
      if(item.Cliente.toString().match(new RegExp(filtro,'i'))  ||  item.Codigo.toString().match(new RegExp(filtro,'i')) ){
        listaCoincidencias.push(item);
      }
    });
    return listaCoincidencias;
  }
}
