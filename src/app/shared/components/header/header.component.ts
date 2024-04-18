import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean = true;
  showNoAuthSection: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  home(): void {
    this.router.navigateByUrl('inicio');
  }

  category(): void {
    this.router.navigateByUrl('categoria');
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
