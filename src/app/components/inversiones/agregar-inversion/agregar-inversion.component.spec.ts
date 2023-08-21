import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInversionComponent } from './agregar-inversion.component';

describe('AgregarInversionComponent', () => {
  let component: AgregarInversionComponent;
  let fixture: ComponentFixture<AgregarInversionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarInversionComponent]
    });
    fixture = TestBed.createComponent(AgregarInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
