export class Usuario{
  id_usuario:number;
  correo:string;
  estado:number=0;
  nombre:string='';
  password:string;
  telefono:string;
  username:string;
  rol_id_rol:number;
  codigoVendedor:number;
  enabled:boolean;
  authorities;
  constructor(){}
}
