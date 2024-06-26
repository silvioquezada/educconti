import { CourseDTO } from "./course.dto";
export class EnrollDTO {
  cod_matricula: number;
  fecha_registro: Date;
  cod_curso: number;
  cod_usuario: number;
  estado_matricula: number;
  estado_respuesta: number;
  estado_aprobacion: number;
  archivo_certificado: string;
  observacion_revision: string;
  documento_descripcion: string;
  estado: number;
  curso: CourseDTO;

  constructor(cod_matricula: number, fecha_registro: Date, cod_curso: number, cod_usuario: number, estado_matricula: number, estado_respuesta: number, estado_aprobacion: number, archivo_certificado: string, observacion_revision: string, documento_descripcion: string, estado: number, curso: CourseDTO) {
    this.cod_matricula = cod_matricula;
    this.fecha_registro = fecha_registro;
    this.cod_curso = cod_curso;
    this.cod_usuario = cod_usuario;
    this.estado_matricula = estado_matricula;
    this.estado_respuesta = estado_respuesta;
    this.estado_aprobacion = estado_aprobacion;
    this.archivo_certificado = archivo_certificado;
    this.observacion_revision = observacion_revision;
    this.documento_descripcion = documento_descripcion;
    this.estado = estado;
    this.curso = curso;
  }
}