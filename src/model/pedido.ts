import { DetallePedido } from './detalle-pedido';

export class Pedido{
  idPedido:number;
  fechaEntrega:string;
  cliente:any;
  codigoCliente:string;
  direccionEntrega:string;
  talonarioPedido:string;
  comentario:string;
  detalle:Array<DetallePedido>;
  total:number=0;
  cuenta:string;
  estado:string;
  fecha:string;
  vendedor:string;
  
  constructor(){}
}
