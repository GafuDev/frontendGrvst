import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListallProyectosComponent } from './listall-proyectos.component';

describe('ListallProyectosComponent', () => {
  let component: ListallProyectosComponent;
  let fixture: ComponentFixture<ListallProyectosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListallProyectosComponent]
    });
    fixture = TestBed.createComponent(ListallProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
