import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoClienteComponent } from './aviso-cliente.component';

describe('AvisoClienteComponent', () => {
  let component: AvisoClienteComponent;
  let fixture: ComponentFixture<AvisoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
