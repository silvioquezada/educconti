import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/manager/models/category.dto';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent implements OnInit {
  categoryDTO: CategoryDTO;
  constructor() {
    this.formNormal();
  }

  ngOnInit(): void {
  }

  formNormal() : void {
    this.categoryDTO = new CategoryDTO(0, '', 1);
  }

  assignValues(categoryDTO: CategoryDTO): void {
    this.categoryDTO = categoryDTO;
  }

}