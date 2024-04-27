import { Component, OnInit } from '@angular/core';
import { PeriodDTO } from 'src/app/manager/models/period.dto';
@Component({
  selector: 'app-period-search',
  templateUrl: './period-search.component.html',
  styleUrls: ['./period-search.component.scss']
})
export class PeriodSearchComponent implements OnInit {
  periodDTO: PeriodDTO;
  constructor() {
    this.formNormal();
  }

  ngOnInit(): void {
  }

  formNormal() : void {
    this.periodDTO = new PeriodDTO(0, '', '', '', 1);
  }

  assignValues(periodDTO: PeriodDTO): void {
    this.periodDTO = periodDTO;
  }

}
