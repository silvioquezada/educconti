import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagerSearchComponent } from './user-manager-search.component';

describe('UserManagerSearchComponent', () => {
  let component: UserManagerSearchComponent;
  let fixture: ComponentFixture<UserManagerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagerSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
