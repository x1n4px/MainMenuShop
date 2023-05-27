import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from './login.component';
import { LoginServiceService } from '../../login-service.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dialogRefMock: MatDialogRef<LoginComponent>;
  let loginServiceMock: jasmine.SpyObj<LoginServiceService>;

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    loginServiceMock = jasmine.createSpyObj('LoginServiceService', ['logout', 'getToken']);
    loginServiceMock.getToken.and.returnValue('mockToken');

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: LoginServiceService, useValue: loginServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });

  describe('cerrarSesion', () => {
    it('Debe cerrar sesión y eliminar el token', () => {
      loginServiceMock.logout.and.returnValue(true);
      loginServiceMock.getToken.and.returnValue(null);
      component.cerrarSesion();
      expect(loginServiceMock.logout).toHaveBeenCalled();
      expect(loginServiceMock.getToken).toHaveBeenCalled();
      expect(component.cerrarSesion).toBeTrue;
     });
  });

  describe('ngOnInit', () => {
    it('Debe inicializar el token', () => {
      expect(component.token).toEqual('mockToken');
    });
  });

});
