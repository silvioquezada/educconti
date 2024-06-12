import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CourseService } from '../../services/course.service';
import { PeriodService } from 'src/app/manager/services/period.service';
import { PeriodDTO } from 'src/app/manager/models/period.dto';
import { EnrollService } from 'src/app/manager/services/enroll.service';
import { InscriptionDTO } from 'src/app/manager/models/inscription.dto';
declare var $:any;
import { environment } from 'src/environments/environment';
import { CourseDTO } from '../../models/course.dto';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  urlImage: string = '../assets/images/logo.svg';
  cod_periodo: number = 0;
  cod_curso: number = 0;
  cod_estado: number = 0;
  cod_matricula: number;
  estado_matricula: number = 0;
  estado_aprobacion: number = 0;
  nombre_curso: string = '';
  nombre_estado: string = '';

  selectedPdf: File = null;
  baseUrlCertificate = environment.baseUrlFile + 'certificatepdf/';
  
  loading: boolean = false;
  periodsDTO: PeriodDTO[];
  coursesDTO: CourseDTO[];
  inscriptionsDTO: InscriptionDTO[];
  inscriptionDTO: InscriptionDTO = new InscriptionDTO(0, '', '', '', '', '', '', '', 0, 1);
  dataStatusInscription: any[] = [
    {
      "cod_estado" : 0,
      "estado" : "Todas las Aprobaciones"
    },
    {
      "cod_estado" : 1,
      "estado" : "Todas las Inscripciones"
    },
    {
      "cod_estado" : 2,
      "estado" : "Aprobados"
    },
    {
      "cod_estado" : 3,
      "estado" : "No Aprobados"
    },
    
    {
      "cod_estado" : 4,
      "estado" : "Pendientes"
    },
    {
      "cod_estado" : 5,
      "estado" : "Matriculados"
    }
  ];

  filterpost = "";
  page = 1;
  count = 0;
  pagesize = 5;

  constructor(private periodService: PeriodService, private courseService: CourseService, private enrollService: EnrollService) {
  }

  ngOnInit() {
    this.cod_estado = 0;
    this.listPeriod();
  }

  exportExcel()
  {
    if(this.inscriptionsDTO.length>0)
    {
      let json = [];
      this.inscriptionsDTO.forEach(element => {

        let valueApprove = '';
        if(this.cod_estado === 0 || this.cod_estado === 2 || this.cod_estado === 3) {
          if(element.estado_aprobacion === 1) {
            valueApprove = 'No Aprobado';
          }

          if(element.estado_aprobacion === 2) {
            valueApprove = 'Aprobado';
          }
        }
        
        if(this.cod_estado === 1 || this.cod_estado === 4 || this.cod_estado === 5) {

          if(element.estado_matricula === 0 || element.estado_matricula === 1 || element.estado_matricula === 2) {
            valueApprove = 'Pendientes';
          }

          if(element.estado_matricula === 3) {
            valueApprove = 'Matriculados';
          }
        }

        let obj = {
          "Cédula" : element.cedula,
          "Apellidos" : element.apellido,
          "Nombres" : element.nombre,
          "Correo": element.correo,
          "Celular" : element.celular,
          "Curso" : element.nombre_curso,
          "Estado" : valueApprove
        }
        json.push(obj);
      });

      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

      const book: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, worksheet, "Sheet1");

      XLSX.writeFile(book, "ExcelSheet.xlsx");
    }
    else
    {
      Swal.fire({
        icon: 'info',
        title: 'Debe generar primero el reporte para exportar',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  async exportPdf()
  {
    if(this.inscriptionsDTO.length>0)
    {
      let tabla = [];
      let titulo = [];
      titulo[0] = { text: "Cédula", bold: true };
      titulo[1] = { text: "Apellidos", bold: true };
      titulo[2] = { text: "Nombres", bold: true };
      titulo[3] = { text: "Correo", bold: true };
      titulo[4] = { text: "Celular", bold: true };
      titulo[5] = { text: "Curso", bold: true };
      titulo[6] = { text: "Estado", bold: true };
      tabla.push(titulo);

      this.inscriptionsDTO.forEach(element => {
        let fila = [];
        fila[0] = element.cedula;
        fila[1] = element.apellido;
        fila[2] = element.nombre;
        fila[3] = element.correo;
        fila[4] = element.celular;
        fila[5] = element.nombre_curso;

        let valueApprove = '';
        if(this.cod_estado === 0 || this.cod_estado === 2 || this.cod_estado === 3) {
          if(element.estado_aprobacion === 1) {
            valueApprove = 'No Aprobado';
          }

          if(element.estado_aprobacion === 2) {
            valueApprove = 'Aprobado';
          }
        }
        
        if(this.cod_estado === 1 || this.cod_estado === 4 || this.cod_estado === 5) {

          if(element.estado_matricula === 0 || element.estado_matricula === 1 || element.estado_matricula === 2) {
            valueApprove = 'Pendientes';
          }

          if(element.estado_matricula === 3) {
            valueApprove = 'Matriculados';
          }
        }

        fila[6] = valueApprove;
        tabla.push(fila);
      });

      const pdfDefinition: any = {
        //pageOrientation: 'portrait',
        pageOrientation: 'landscape',
        
        content: [
          {
            image: await this.getBase64ImageFromURL('../assets/images/logo.svg'),
            width: 50,
            alignment: 'center'
          },
          {
            text: 'Reporte de Nóminas',
            fontSize: 16,  
            alignment: 'center',  
            color: '#047886'  
          },
          {
            text: 'Curso: ' + this.nombre_curso,
            margin: [0, 5, 0, 5]
          },
          {
            text: 'Estado: ' + this.nombre_estado,
            margin: [0, 5, 0, 5]
          },
          {
            table: {
              widths: ['auto', 'auto', 'auto', 'auto', 'auto', '*', 'auto'],
              body:
                tabla
            }
          }
        ]
      }
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    }
    else
    {
      Swal.fire({
        icon: 'info',
        title: 'Debe generar primero el reporte para exportar',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  changePeriod(event: any): void {
    const elemento = event.target.value;
    this.cod_periodo = Number(elemento);
    this.cod_curso = 0;
    this.cod_estado = 0;
    this.nombre_curso = 'Todos';
    this.coursesDTO = [];
    this.inscriptionsDTO = [];
    this.listCourse();
    this.listAllEstudentsCourseApprove();
  }

  changeCourse(event: any): void {
    const elemento = event.target.value;
    this.cod_curso = Number(elemento);
    this.nombre_curso = this.coursesDTO.find( (item) => item.cod_curso === this.cod_curso ).nombre_curso;

    this.searchSelect();
  }

  changeStatus(event: any): void {
    const elemento = event.target.value;
    this.cod_estado = Number(elemento);
    this.nombre_estado = this.dataStatusInscription.find( (item) => item.cod_estado === this.cod_estado ).estado;
    this.searchSelect();
  }

  searchSelect(): void {
    if(this.cod_curso === 0 && this.cod_estado === 0) {
      this.listAllEstudentsCourseApprove();
    }

    if(this.cod_curso === 0 && (this.cod_estado === 2 || this.cod_estado === 3)) {
      if(this.cod_estado === 2) {
        this.estado_aprobacion = 2;
      } else {
        this.estado_aprobacion = 1;
      }
      this.listAllEstudentsCourseApproveStatus();
    }

    if(this.cod_curso !== 0 && (this.cod_estado === 2 || this.cod_estado === 3)) {
      if(this.cod_estado === 2) {
        this.estado_aprobacion = 2;
      } else {
        this.estado_aprobacion = 1;
      }
      this.listEstudentsCourseApprove();
    }

    if(this.cod_curso !== 0 && (this.cod_estado === 0)) {
      this.listAllEstudentsCourseApproveAllStatus();
    }





    if(this.cod_curso === 0 && this.cod_estado === 1) {
      this.listAllEstudentsCourseInscribed();
    }

    if(this.cod_curso === 0 && (this.cod_estado === 4 || this.cod_estado === 5)) {
      if(this.cod_estado === 4) {
        this.estado_matricula = 1;//0, 1, 2
      } else {
        this.estado_matricula = 3;
      }
      this.listAllEstudentsCourseInscribedStatus();
    }

    if(this.cod_curso !== 0 && (this.cod_estado === 4 || this.cod_estado === 5)) {
      if(this.cod_estado === 4) {
        this.estado_matricula = 1;//0, 1, 2
      } else {
        this.estado_matricula = 3;
      }
      this.listEstudentsCourseInscribed();
    }

    if(this.cod_curso !== 0 && this.cod_estado === 1) {
      this.listAllEstudentsCourseInscribedAllStatus();
    }
  }

  listPeriod(): void {
    this.loading = true;

    this.periodService.list()
    .subscribe( (data) => {
        this.loading = false;
        this.periodsDTO = data;
        if(this.periodsDTO.length>0) {
          this.cod_periodo = this.periodsDTO[0].cod_periodo;
          this.nombre_curso = 'Todos';
          this.nombre_estado = 'Todas las Aprobaciones';
          this.listCourse();
          this.listAllEstudentsCourseApprove();
        }
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  listCourse(): void {
    this.loading = true;

    this.courseService.listCoursePeriod(this.cod_periodo)
    .subscribe( (data) => {
        this.loading = false;
        this.coursesDTO = data;
        if(data.length>0) {
          this.coursesDTO.unshift(new CourseDTO(0, null, '', null, '', '', 'Todos', '', null, null, null, null, '', null, '', '', 1));
        }
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  listAllEstudentsCourseApprove(): void {
    this.loading = true;

    this.enrollService.listAllEstudentsCourseApprove(this.cod_periodo)
    .subscribe( (data) => {
        this.loading = false;
        this.inscriptionsDTO = data;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  listAllEstudentsCourseApproveStatus(): void {
    this.loading = true;

    this.enrollService.listAllEstudentsCourseApproveStatus(this.cod_periodo, this.estado_aprobacion)
    .subscribe( (data) => {
        this.loading = false;
        this.inscriptionsDTO = data;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  listEstudentsCourseApprove(): void {
    this.loading = true;

    this.enrollService.listEstudentsCourseApprove(this.cod_curso, this.estado_aprobacion)
    .subscribe( (data) => {
        this.loading = false;
        this.inscriptionsDTO = data;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  listAllEstudentsCourseApproveAllStatus(): void {
    this.loading = true;

    this.enrollService.listAllEstudentsCourseApproveAllStatus(this.cod_curso)
    .subscribe( (data) => {
        this.loading = false;
        this.inscriptionsDTO = data;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }



  listAllEstudentsCourseInscribed(): void {
    this.loading = true;

    this.enrollService.listAllEstudentsCourseInscribed(this.cod_periodo)
    .subscribe( (data) => {
        this.loading = false;
        this.inscriptionsDTO = data;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  listAllEstudentsCourseInscribedStatus(): void {
    this.loading = true;

    this.enrollService.listAllEstudentsCourseInscribedStatus(this.cod_periodo, this.estado_matricula)
    .subscribe( (data) => {
        this.loading = false;
        this.inscriptionsDTO = data;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  listEstudentsCourseInscribed(): void {
    this.loading = true;

    this.enrollService.listEstudentsCourseInscribed(this.cod_curso, this.estado_matricula)
    .subscribe( (data) => {
        this.loading = false;
        this.inscriptionsDTO = data;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  listAllEstudentsCourseInscribedAllStatus(): void {
    this.loading = true;

    this.enrollService.listAllEstudentsCourseInscribedAllStatus(this.cod_curso)
    .subscribe( (data) => {
        this.loading = false;
        this.inscriptionsDTO = data;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Se ha originado un error en el servidor',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
    
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");
    
        resolve(dataURL);
      };
    
      img.onerror = error => {
        reject(error);
      };
    
      img.src = url;
    });}

  keyFilter() {
    this.page = 1;
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

}
