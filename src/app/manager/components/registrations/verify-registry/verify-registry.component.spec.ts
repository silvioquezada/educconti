import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRegistryComponent } from './verify-registry.component';

describe('VerifyRegistryComponent', () => {
  let component: VerifyRegistryComponent;
  let fixture: ComponentFixture<VerifyRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyRegistryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
