export class RequirementsDTO {
  cod_requisitos: number;
  requisitos: string;
  estado: number;

  constructor(cod_requisitos: number, requisitos: string) {
    this.cod_requisitos = cod_requisitos;
    this.requisitos = requisitos;
  }
}