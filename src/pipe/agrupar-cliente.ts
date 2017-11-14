import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filtrar',
  pure: false
})
export class AgruparClientePipe implements PipeTransform {
   public tmp:Array<any>=new Array<any>();
   transform(lista:Array<any>,campo:string,campo2?:string):Array<any> {
      this.tmp = [];
      let arr = [];
      arr = lista.filter((pedido)=>new RegExp(campo).test(pedido.Cliente));
      if(campo2!=undefined){
        arr=lista.filter((pedido)=>new RegExp(campo2).test(pedido.CodCliente));
      }
      this.tmp.push(...arr);
      return this.tmp;
  }
}
