import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourse'
})
export class FilterCoursePipe implements PipeTransform {
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
        this.data = item.cedula.toLowerCase().includes(texto) || item.apellido.toLowerCase().includes(texto) || item.nombre.toLowerCase().includes(texto);
        return this.data;
      }
      else
      {

        let coincidencia = 0;
        for(let c=0; c<frases.length; c++) {

          this.data = item.cedula.toLowerCase().includes(frases[c]) || item.apellido.toLowerCase().includes(frases[c]) || item.nombre.toLowerCase().includes(frases[c]);
         
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
