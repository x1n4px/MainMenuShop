import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordresetComponent } from './passwordreset.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginServiceService } from 'src/app/login-service.service';

describe('PasswordresetComponent', () => {
  let component: PasswordresetComponent;
  let fixture: ComponentFixture<PasswordresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordresetComponent ],
      imports: [ HttpClientTestingModule,
      HttpClientModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { contrasena: 'password123' }  },
        { provide: HttpClient, useClass: HttpClientTestingModule },
        { provide: LoginServiceService, useValue: jasmine.createSpyObj('LoginServiceService', ['resetPassword'])}

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });

   it('Debe inicializar el componente con los datos esperados', () => {
    expect(component.datos).toEqual('password123');
  });

});
