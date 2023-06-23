import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFComponent } from './producto-f.component';

describe('ProductoFComponent', () => {
  let component: ProductoFComponent;
  let fixture: ComponentFixture<ProductoFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
