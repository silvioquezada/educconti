import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRegistration'
})
export class FilterRegistrationPipe implements PipeTransform {
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
        this.data = item.usuario.toLowerCase().includes(texto) || item.nombre_curso.toLowerCase().includes(texto);
        return this.data;
      }
      else
      {

        let coincidencia = 0;
        for(let c=0; c<frases.length; c++) {

          this.data = item.usuario.toLowerCase().includes(frases[c]) || item.nombre_curso.toLowerCase().includes(frases[c]);
         
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