import { ResponseCeduleDTO } from "./responseCedule.dto";

export class UsuarioDTO {
    cod_usuario: number;
    cedula: string;
    apellido: string;
    nombre: string;
    genero: string;
    etnia: string;
    direccion: string;
    celular: string;
    correo: string;
    nivel_instruccion: string;
    usuario: string;
    password: string;
    estado: number;
    tipo_usuario: string;
    token: string;
  
    constructor(cod_usuario: number, cedula: string, apellido: string, nombre: string, genero: string, etnia: string, direccion: string, celular: string, correo: string, nivel_instruccion: string, usuario: string, password: string, estado: number, tipo_usuario: string, token: string) {
      this.cod_usuario = cod_usuario;
      this.cedula = cedula;
      this.apellido = apellido;
      this.nombre = nombre;
      this.genero = genero,
      this.etnia = etnia;
      this.direccion = direccion;
      this.celular = celular;
      this.correo = correo;
      this.nivel_instruccion = nivel_instruccion
      this.usuario = usuario;
      this.password = password;
      this.estado = estado;
      this.tipo_usuario = tipo_usuario;
      this.token = token;
    }

    ValidateCedula(cedula: string) {
     
        let responseCeduleDTO = new ResponseCeduleDTO;
        if(cedula.length === 10){
           
           let digito_region = Number(cedula.substring(0,2));
           
           if( digito_region >= 1 && digito_region <=24 ){
             
             let ultimo_digito = Number(cedula.substring(9,10));
   
             let pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));
   
             let numero1 = Number(cedula.substring(0,1));
             numero1 = (numero1 * 2);
             if( numero1 > 9 ){ numero1 = (numero1 - 9); }
   
             let numero3 = Number(cedula.substring(2,3));
             numero3 = (numero3 * 2);
             if( numero3 > 9 ){ numero3 = (numero3 - 9); }
   
             let numero5 = Number(cedula.substring(4,5));
             numero5 = (numero5 * 2);
             if( numero5 > 9 ){ numero5 = (numero5 - 9); }
   
             let numero7 = Number(cedula.substring(6,7));
             numero7 = (numero7 * 2);
             if( numero7 > 9 ){ numero7 = (numero7 - 9); }
   
             let numero9 = Number(cedula.substring(8,9));
             numero9 = (numero9 * 2);
             if( numero9 > 9 ){ numero9 = (numero9 - 9); }
   
             let impares = numero1 + numero3 + numero5 + numero7 + numero9;
   
             let suma_total = (pares + impares);
   
             let primer_digito_suma = String(suma_total).substring(0,1);
   
             let decena = (parseInt(primer_digito_suma) + 1)  * 10;
   
             let digito_validador = decena - suma_total;
   
             if(digito_validador === 10)
               digito_validador = 0;
   
             if(digito_validador === ultimo_digito){
               responseCeduleDTO = null;
             }else{
               responseCeduleDTO.isValid = true;
               responseCeduleDTO.messagueCedula = 'Cédula es incorrecta';
             }
           }else{
             responseCeduleDTO.isValid = true;
             responseCeduleDTO.messagueCedula = 'Cédula no pertenece a ninguna region';
           }
        }else{
         responseCeduleDTO.isValid = true;
         responseCeduleDTO.messagueCedula = 'Cédula tiene menos de 10 Digitos';
        } 
      
       return responseCeduleDTO;
    }
  }