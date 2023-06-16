import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaPagoComponent } from './pantalla-pago.component';

describe('PantallaPagoComponent', () => {
  let component: PantallaPagoComponent;
  let fixture: ComponentFixture<PantallaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
