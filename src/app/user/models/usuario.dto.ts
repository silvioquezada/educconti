export class UsuarioDTO {
    cod_usuario: string;
    cedula: string;
    apellido: string;
    nombre: string;
    genero: string;
    etnia: string;
    direccion: string;
    celular: string;
    correo: string;
    nivel_instruccion: string;
    usuario: string;
    password: string;
    estado: number;
    access_token: string;
  
    constructor(cod_usuario: string, cedula: string, apellido: string, nombre: string, genero: string, etnia: string, direccion: string, celular: string, correo: string, nivel_instruccion: string, usuario: string, password: string, estado: number, access_token: string) {
      this.cod_usuario = cod_usuario;
      this.cedula = cedula;
      this.apellido = apellido;
      this.nombre = nombre;
      this.genero = genero,
      this.etnia = etnia;
      this.direccion = direccion;
      this.celular = celular;
      this.correo = correo;
      this.nivel_instruccion = nivel_instruccion
      this.usuario = usuario;
      this.password = password;
      this.estado = estado;
      this.access_token = access_token;
    }
  }