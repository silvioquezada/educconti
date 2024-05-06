export class InscriptionDTO {
  cod_matricula: number;
  usuario: string;
  nombre_curso: string;
  correo: string;
  celular: string;

  constructor(cod_matricula: number, usuario: string, nombre_curso: string, correo: string, celular: string) {
    this.cod_matricula = cod_matricula;
    this.usuario = usuario;
    this.nombre_curso = nombre_curso;
    this.correo = correo;
    this.celular = celular;
  }
}