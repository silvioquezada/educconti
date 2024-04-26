import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodSearchComponent } from './period-search.component';

describe('PeriodSearchComponent', () => {
  let component: PeriodSearchComponent;
  let fixture: ComponentFixture<PeriodSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
