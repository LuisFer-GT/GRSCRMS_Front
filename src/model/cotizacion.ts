
import { DetalleCotizacion } from './detalle-cotizacion';
import { Usuario } from './usuario';
export class Cotizacion{
    idCotizacion:number;
    fechaEntrega:string;
    cliente:any;
    codigoCliente:string;
    direccionEntrega:string;
    talonarioDePedido:string;
    comentario:string;
    detalle:Array<DetalleCotizacion>;
    total:number=0;
    cuenta:string;
    estado:string;
    fecha:string;
    vendedor:string;
    usuario:Usuario;
    fechaVencimiento:string;
    createdAt:string;
    updatedAt:string;
    constructor(){}
}