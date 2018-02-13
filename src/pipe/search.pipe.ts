import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(lista:Array<any>, filtro:string):Array<any> {
    let listaCoincidencias:Array<any>=new Array<any>();
    if(!filtro){
      return lista;
    }
    lista.forEach((item)=>{
      if(item.NumPedido.toString().match(new RegExp(filtro,'i'))  ||  item.FechaVencimiento.toString().match(new RegExp(filtro,'i'))  ||item.Cliente.toString().match(new RegExp(filtro,'i')) ){
        listaCoincidencias.push(item);
      }
    });
    return listaCoincidencias;
  }
}