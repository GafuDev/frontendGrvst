import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProyectoComponent } from './listar-proyecto.component';

describe('ListarProyectoComponent', () => {
  let component: ListarProyectoComponent;
  let fixture: ComponentFixture<ListarProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarProyectoComponent]
    });
    fixture = TestBed.createComponent(ListarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
