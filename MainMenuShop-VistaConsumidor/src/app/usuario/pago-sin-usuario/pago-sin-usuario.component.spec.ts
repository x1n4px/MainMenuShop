import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoSinUsuarioComponent } from './pago-sin-usuario.component';

describe('PagoSinUsuarioComponent', () => {
  let component: PagoSinUsuarioComponent;
  let fixture: ComponentFixture<PagoSinUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoSinUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoSinUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
