import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchCliente pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'SearchSaldoDetalle',
})
export class SearchSaldoDetallePipe implements PipeTransform {

  transform(lista:Array<any>, filtro:string):Array<any> {
    let listaCoincidencias:Array<any>=new Array<any>();
    if(!filtro){
      return lista;
    }
    lista.forEach((item)=>{
      if(item.Fecha_Vencimiento.toString().match(new RegExp(filtro,'i'))  ||  item.No_Documento.toString().match(new RegExp(filtro,'i')) ){
        listaCoincidencias.push(item);
      }
    });
    return listaCoincidencias;
  }
}
