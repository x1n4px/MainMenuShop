import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaArticulosComponent } from './busqueda-articulos.component';

describe('BusquedaArticulosComponent', () => {
  let component: BusquedaArticulosComponent;
  let fixture: ComponentFixture<BusquedaArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
