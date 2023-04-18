import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarTicketComponent } from './recuperar-ticket.component';

describe('RecuperarTicketComponent', () => {
  let component: RecuperarTicketComponent;
  let fixture: ComponentFixture<RecuperarTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
