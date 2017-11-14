import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'distinct',
})
export class DistinctPipe implements PipeTransform {
   public tmp:Array<any>;
   transform(lista:Array<any>,campo:string,campo2?:string):Array<any> {
      this.tmp=new Array<any>();
      this.tmp.length = 0;
      let arr =lista.filter((pedido)=>new RegExp(campo).test(pedido.cliente));
      this.tmp.push(...arr);
      return this.tmp;
  }
}
