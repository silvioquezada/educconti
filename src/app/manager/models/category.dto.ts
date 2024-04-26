export class ManagerDTO {
  cod_usuario: number;
  apellido: string;
  nombre: string;
  celular: string;
  correo: string;
  usuario: string;
  password: string;
  estado: number;
  tipo_usuario: string;
  token: string;

  constructor(cod_usuario: number, apellido: string, nombre: string, celular: string, correo: string, usuario: string, password: string, estado: number, tipo_usuario: string, token: string) {
    this.cod_usuario = cod_usuario;
    this.apellido = apellido;
    this.nombre = nombre;
    this.celular = celular;
    this.correo = correo;
    this.usuario = usuario;
    this.password = password;
    this.estado = estado;
    this.tipo_usuario = tipo_usuario;
    this.token = token;
  }
}