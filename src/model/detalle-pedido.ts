export class DetallePedido{
  idPedido:number;
  articulo:string;
  cantidad:number;
  promocional:string="No";
  bodega : string = "01";
  precio:number=0.0;
  Currency:string;
  remate: string;
  constructor(){}
}
