import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInversionComponent } from './listar-inversion.component';

describe('ListarInversionComponent', () => {
  let component: ListarInversionComponent;
  let fixture: ComponentFixture<ListarInversionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarInversionComponent]
    });
    fixture = TestBed.createComponent(ListarInversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
