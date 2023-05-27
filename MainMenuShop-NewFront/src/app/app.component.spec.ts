import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { LoginServiceService } from './login-service.service';
import { of, throwError } from 'rxjs';
import { PasswordresetComponent } from './modals/passwordreset/passwordreset.component';
import { Router } from '@angular/router';
import { LoginComponent } from './modals/login/login.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loginService: LoginServiceService;

  describe(`(1) TEST del componente "AppComponent"`, () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          MatDialogModule,
          MatSnackBarModule,
          RouterTestingModule,
          RouterTestingModule,
          FormsModule,
          HttpClientTestingModule,
          ReactiveFormsModule
        ],
        declarations: [
          AppComponent,
          PasswordresetComponent
        ],
        providers: [
          LoginServiceService
        ]
      }).compileComponents();

      // Modificación del proveedor del servicio
      loginService = TestBed.inject(LoginServiceService);
      spyOn(loginService, 'generateToken').and.callFake((loginData) => {
         if (loginData.email === 'pruebaUnitaria' && loginData.password === 'pruebaUnitaria') {
          return of({ token: 'mock-token' });
        } else {
          return throwError('Credenciales incorrectas');
        }
      });






    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('Debe de crear la app', () => {
      expect(component).toBeTruthy();
    });

    //TODO:Aislado!
    it('Debe de existir el AppComponent', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy(); //TODO: ✔
    });

    //TODO:Aislado!
    it('Debe retornar formulario Valido', () => {
      component.loginData.email = 'pruebaUnitaria';
      component.loginData.password = 'pruebaUnitaria';
      const formSubmitSpy = spyOn(component, 'formSubmit').and.callThrough();
      const event = new Event('submit');
      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(event);
      fixture.detectChanges();

      expect(formSubmitSpy).toHaveBeenCalled();
      expect(component.form).toBeDefined();
      expect(component.form.valid).toBeTrue();
    });

    //TODO:Aislado!
    it('Debe enviar el formulario con éxito', () => {
      component.loginData.email = 'pruebaUnitaria';
      component.loginData.password = 'pruebaUnitaria';
      const formSubmitSpy = spyOn(component, 'formSubmit').and.callThrough();
      const event = new Event('submit');
      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(event);
      fixture.detectChanges();

      expect(formSubmitSpy).toHaveBeenCalled();
      expect(loginService.generateToken).toHaveBeenCalledWith(component.loginData);
      expect(component.error).toBeFalse();
    });

    //TODO:Aislado!
    it('Debe mostrar mensaje de error si las credenciales son incorrectas', () => {
      component.loginData.email = 'pruebaUnitaria';
      component.loginData.password = 'contrasenaIncorrecta';
      const formSubmitSpy = spyOn(component, 'formSubmit').and.callThrough();
      const event = new Event('submit');
      const form = fixture.nativeElement.querySelector('form');
      form.dispatchEvent(event);
      fixture.detectChanges();

      expect(formSubmitSpy).toHaveBeenCalled();
      expect(loginService.generateToken).toHaveBeenCalledWith(component.loginData);
      expect(component.error).toBeTrue();
    });

    it('Debe solicitar una nueva contraseña y mostrar el diálogo correspondiente si hay respuesta', () => {
      component.emailP = 'pruebaUnitaria';
      const response = { nuevaContrasena: 'newPassword123' };
      spyOn(component.loginService, 'requestNewPassword').and.returnValue(of(response));
      const openDialogResetSpy = spyOn(component, 'openDialogReset').and.callThrough();
      component.formSubmitReset();
      expect(component.error).toBeFalse();
      expect(openDialogResetSpy).toHaveBeenCalledWith(response.nuevaContrasena);
    });

    it('Debe mostrar error si no se recibe nueva contraseña', () => {
      component.emailP = 'pruebaUnitaria';
      const response = { nuevaContrasena: null };
      spyOn(component.loginService, 'requestNewPassword').and.returnValue(of(response));
      component.formSubmitReset();
      expect(component.error).toBeTrue();
    });

    it('Debe de abrir el dialogo', () => {
      const spy = spyOn(component.dialog, 'open').and.callThrough();
      component.openDialog();

      expect(spy).toHaveBeenCalledWith(LoginComponent, {
        data: {   }
      });
    });


    it('Debe abrir el dialogo de reinicio de contraseña', () => {
      const spy = spyOn(component.dialog, 'open').and.callThrough();
      const datos = 'mock-datos';
      component.openDialogReset(datos);

      expect(spy).toHaveBeenCalledWith(PasswordresetComponent, {
        data: { contrasena: datos }
      });
    });

    it('debe crear un usuario y actualizar la acción', () => {
      // Crear el objeto de prueba
      const usuario = {
        "password": "test",
        "nombre": null,
        "apellido1": null,
        "apellido2": null,
        "roles": [
          "VICERRECTORADO"
        ],
        "email": "test"
      };

      // Espiar el servicio de login
      spyOn(component.loginService, 'crearUsuario').and.returnValue(
        of({}) // Devolver un observable vacío para simular la respuesta del servidor
      );

      // Llamar al método de prueba
      component.crearUsuario();

      // Comprobar que el método del servicio ha sido llamado
      expect(component.loginService.crearUsuario).toHaveBeenCalledWith(usuario);

      // Comprobar que la acción se ha actualizado correctamente
      expect(component.accion).toBe('creado');
    });

    it('debe manejar un error de autorización', () => {
      // Espiar el servicio de login
      spyOn(component.loginService, 'crearUsuario').and.returnValue(
        throwError({ status: 401 }) // Devolver un observable con un error 401 para simular un error de autorización
      );

      // Llamar al método de prueba
      component.crearUsuario();

      // Comprobar que el método del servicio ha sido llamado
      expect(component.loginService.crearUsuario).toHaveBeenCalled();

      // Comprobar que la acción se ha actualizado correctamente
      expect(component.accion).toBe('401R');
    });

  });
});
