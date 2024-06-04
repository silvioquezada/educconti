import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCourseComponent } from './item-course.component';

describe('ItemCourseComponent', () => {
  let component: ItemCourseComponent;
  let fixture: ComponentFixture<ItemCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
