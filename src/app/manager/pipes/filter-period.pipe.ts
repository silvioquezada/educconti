import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPeriod'
})
export class FilterPeriodPipe implements PipeTransform {
  private data: any;

  transform(arreglo: any[], texto: string): any[] {
    if (texto === '') {
      return arreglo;
    }

    texto = texto.toLocaleLowerCase();

    let frases = texto.split(' ');

    return arreglo.filter(item => {
      
      if (frases.length===1)
      {
        this.data = item.codigo_periodo.toLowerCase().includes(texto) || item.anio.toString().toLowerCase().includes(texto) || item.descripcion.toLowerCase().includes(texto);
        return this.data;
      }
      else
      {

        let coincidencia = 0;
        for(let c=0; c<frases.length; c++) {

          this.data = item.codigo_periodo.toLowerCase().includes(frases[c]) || item.anio.toString().toLowerCase().includes(frases[c]) || item.descripcion.toLowerCase().includes(frases[c]);
         
         if(this.data)
         {
          coincidencia = coincidencia + 1;
         }

        }
   
        if(coincidencia==frases.length){
          return this.data;
        }
       
      }
      
    });

  }

}
