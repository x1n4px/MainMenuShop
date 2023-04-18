import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiradaEfectivoComponent } from './retirada-efectivo.component';

describe('RetiradaEfectivoComponent', () => {
  let component: RetiradaEfectivoComponent;
  let fixture: ComponentFixture<RetiradaEfectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetiradaEfectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetiradaEfectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
