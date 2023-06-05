import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporteDiaComponent } from './importe-dia.component';

describe('ImporteDiaComponent', () => {
  let component: ImporteDiaComponent;
  let fixture: ComponentFixture<ImporteDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImporteDiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImporteDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
