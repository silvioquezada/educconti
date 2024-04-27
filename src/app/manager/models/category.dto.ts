export class CategoryDTO {
  cod_categoria: number;
  categoria: string;
  estado: number;

  constructor(cod_categoria: number, categoria: string, estado: number) {
    this.cod_categoria = cod_categoria;
    this.categoria = categoria;
    this.estado = estado;
  }
}