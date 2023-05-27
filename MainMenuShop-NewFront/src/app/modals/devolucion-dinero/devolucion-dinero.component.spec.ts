import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionDineroComponent } from './devolucion-dinero.component';

describe('DevolucionDineroComponent', () => {
  let component: DevolucionDineroComponent;
  let fixture: ComponentFixture<DevolucionDineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionDineroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucionDineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
