export class Function{
  private static tmp:Array<any>;
  public static distinct(items:Array<any>):Array<any>{
    this.tmp = new Array<any>();
    let bandera:boolean=false;
    for(let i in items){
      if(this.tmp.length<=0){
          this.tmp.push(items[0]);
      }
      for(let ii in this.tmp){
        if(items[i].Cliente!==this.tmp[ii].Cliente){
          bandera=true;
        }else{
          bandera=false;
        }
      }
      if(bandera){
        this.tmp.push(items[i]);
        bandera=false;
      }
    }
    return this.tmp;
  }

  public static getCurrency(codPais:string){
    if(codPais==='GRS-GT'){
      return 'QTZ'
    }else if(codPais==='GRS-HN'){
      return 'LP';
    }else if(codPais==='GRS-ES'){
      return 'USD';
    }else if(codPais==='GRS-NI'){
      return 'NIO';
    }else if(codPais==='GRS-CR'){
      return 'CRC';
    }else if(codPais==='GRS-TEST'){
      return 'QTZ';
    }
  }
}
