import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMensajeComponent } from './detalles-mensaje.component';

describe('DetallesMensajeComponent', () => {
  let component: DetallesMensajeComponent;
  let fixture: ComponentFixture<DetallesMensajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesMensajeComponent]
    });
    fixture = TestBed.createComponent(DetallesMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
