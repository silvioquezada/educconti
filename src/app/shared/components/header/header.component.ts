import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from '../../models/header-menus.dto';
import { AccessService } from '../../services/access.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CategoryDTO } from 'src/app/manager/models/category.dto';
import { CategoryService } from 'src/app/manager/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showAuthNormal: boolean = false;
  showAuthManager: boolean = false;
  statusSesion : string = "";
  userName: string = "";
  loading: boolean = false;
  categoriesDTO: CategoryDTO[];

  constructor(private router: Router, private accessservice: AccessService, private localStorageService: LocalStorageService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.accessservice.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
                    
          this.showAuthNormal = headerInfo.status_normal;
          this.showAuthManager = headerInfo.status_manager;

          this.statusSesion = this.localStorageService.getData("estado_sesion")!;

          if(this.statusSesion == "")
          {
            this.showAuthNormal = headerInfo.status_normal;
            this.showAuthManager = headerInfo.status_manager; 
            this.userName = "";
          } else {
            if(this.localStorageService.getData("tipo_usuario")==="NORMAL") {
              this.showAuthNormal = true;
              this.showAuthManager = false;
            } else {
              this.showAuthNormal = true;
              this.showAuthManager = true;
            }
            this.userName = this.localStorageService.getData("usuario");
          }
        }
      }
    );
    this.listCategories();
  }

  listCategories(): void {
    this.loading = true;

    this.categoryService.list()
    .subscribe( (data) => {
        this.loading = false;
        this.categoriesDTO = data;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }

  closeSesion(): void {
    this.localStorageService.clearData();    
    const headerInfo: HeaderMenus = {
      status_manager: false,
      status_normal: false
    };
    this.accessservice.headerManagement.next(headerInfo);
    this.router.navigateByUrl('inicio');
  }

  home(): void {
    this.router.navigateByUrl('inicio');
  }

  category(cod_categoria: number): void {
    this.router.navigateByUrl('categoria/' + cod_categoria);
  }

  mycourses(): void {
    this.router.navigateByUrl('mis_cursos');
  }

  requirements(): void {
    this.router.navigateByUrl('requisitos');
  }

  about(): void {
    this.router.navigateByUrl('acerca_de');
  }

  login(): void {
    this.router.navigateByUrl('user/login');
  }

  profile(): void {
    this.router.navigateByUrl('user/perfil');
  }

  dashboard(): void {
    this.router.navigateByUrl('manager/dashboard');
  }

  requirementsmanager(): void {
    this.router.navigateByUrl('manager/requisitos');
  }

  user(): void {
    this.router.navigateByUrl('manager/usuario');
  }

  period(): void {
    this.router.navigateByUrl('manager/periodo');
  }

  categories(): void {
    this.router.navigateByUrl('manager/categoria');
  }

  course(): void {
    this.router.navigateByUrl('manager/cursos');
  }

  registrations(): void {
    this.router.navigateByUrl('manager/inscripciones');
  }

  approvals(): void {
    this.router.navigateByUrl('manager/aprobaciones');
  }

  reports(): void {
    this.router.navigateByUrl('manager/reportes');
  }

}
