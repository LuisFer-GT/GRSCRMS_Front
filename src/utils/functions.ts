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
}
