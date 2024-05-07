export class InscriptionDTO {
  cod_matricula: number;
  usuario: string;
  nombre_curso: string;
  correo: string;
  celular: string;
  observacion_revision: string;
  documento_descripcion: string;
  estado: number;

  constructor(cod_matricula: number, usuario: string, nombre_curso: string, correo: string, celular: string, observacion_revision: string, documento_descripcion: string, estado: number) {
    this.cod_matricula = cod_matricula;
    this.usuario = usuario;
    this.nombre_curso = nombre_curso;
    this.correo = correo;
    this.celular = celular;
    this.observacion_revision = observacion_revision;
    this.documento_descripcion = documento_descripcion;
    this.estado = estado;
  }
}