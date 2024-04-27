export class PeriodDTO {
  cod_periodo: number;
  codigo_periodo: string;
  anio: string;
  descripcion: string;
  estado: number;

  constructor(cod_periodo: number, codigo_periodo: string, anio: string, descripcion: string, estado: number) {
    this.cod_periodo = cod_periodo;
    this.codigo_periodo = codigo_periodo;
    this.anio = anio;
    this.descripcion = descripcion;
    this.estado = estado;
  }
}