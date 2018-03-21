export class DetalleCotizacion{
    idPedido:number;
    articulo:string;
    cantidad:number;
    promocional;
    bodega : string = "01";
    precio:number=0.0;
    Currency:string;
    remate: string;
    SubTotal: number;
    Tax:number;
    createdAt:string;
    updatedAt:string;
    constructor(){}
}