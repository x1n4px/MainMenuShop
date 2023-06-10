import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaTiendaComponent } from './busqueda-tienda.component';

describe('BusquedaTiendaComponent', () => {
  let component: BusquedaTiendaComponent;
  let fixture: ComponentFixture<BusquedaTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaTiendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
