import { DetallePedido } from './detalle-pedido';
import { Usuario } from './usuario';
export class Pedido{
  idPedido:number;
  fechaEntrega:string;
  cliente:any;
  codigoCliente:string;
  direccionEntrega:string;
  talonarioDePedido:string;
  comentario:string;
  detalle:Array<DetallePedido>;
  total:number=0;
  cuenta:string;
  estado:string;
  fecha:string;
  vendedor:string;
  usuario:Usuario;
  constructor(){}
}
