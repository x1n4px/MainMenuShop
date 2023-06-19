import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosArticuloComponent } from './datos-articulo.component';

describe('DatosArticuloComponent', () => {
  let component: DatosArticuloComponent;
  let fixture: ComponentFixture<DatosArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
