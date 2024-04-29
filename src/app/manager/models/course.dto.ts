export class CourseDTO {
  cod_curso: number;
  cod_periodo: number;
  cod_categoria: number;
  codigo_curso: string;
  nombre_curso: string;
  fecha_inicio_inscripcion: Date;
  fecha_fin_inscripcion: Date;
  fecha_inicio: Date;
  fecha_fin: Date;
  modalidad: string;
  cupo: number;
  descripcion: string;
  documento_descripcion: string;
  estado: number;

  constructor(cod_curso: number, cod_periodo: number, cod_categoria: number, codigo_curso: string, nombre_curso: string, fecha_inicio_inscripcion: Date, fecha_fin_inscripcion: Date, fecha_inicio: Date, fecha_fin: Date, modalidad: string, cupo: number, descripcion: string, documento_descripcion: string, estado: number) {
    this.cod_curso = cod_curso;
    this.cod_periodo = cod_periodo;
    this.cod_categoria = cod_categoria;
    this.codigo_curso = codigo_curso;
    this.nombre_curso = nombre_curso;
    this.fecha_inicio_inscripcion = fecha_inicio_inscripcion;
    this.fecha_fin_inscripcion = fecha_fin_inscripcion;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.modalidad = modalidad;
    this.cupo = cupo;
    this.descripcion = descripcion;
    this.documento_descripcion = documento_descripcion;
    this.estado = estado;
  }
}