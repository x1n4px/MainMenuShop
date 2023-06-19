import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginServiceService } from './login-service.service';

describe('LoginServiceService', () => {
  let service: LoginServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginServiceService]
    });
    service = TestBed.inject(LoginServiceService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe de crearse', () => {
    expect(service).toBeTruthy();
  });

  describe('generateToken', () => {
    it('Debe de enviar correctamente los datos de inicio de sesión', () => {
      const loginData = { username: 'user', password: 'password' };
      const mockResponse = { token: 'abc123' };
      service.generateToken(loginData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      const req = httpMock.expectOne('http://localhost:8080/login');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(loginData);
      req.flush(mockResponse);
    });
  });

  describe('requestNewPassword', () => {
    it('Debe solicitar la nueva contraseña del email dado', () => {
      const email = 'test@example.com';
      const mockResponse = { message: 'Password reset email sent' };
      service.requestNewPassword(email).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      const req = httpMock.expectOne('http://localhost:8080/passwordreset');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ email });
      req.flush(mockResponse);
    });
  });

  describe('loginUser', () => {
    it('Debe almacenar el token', () => {
      const token = 'abc123';
      expect(service.loginUser(token)).toBeTrue();
      expect(localStorage.getItem('token')).toEqual(token);
    });
  });

  describe('getToken', () => {
    it('Debe devolver el token', () => {
      const token = 'abc123';
      localStorage.setItem('token', token);
      expect(service.getToken()).toEqual(token);
    });
  });

  describe('logout', () => {
    it('Debe eliminar el token', () => {
      localStorage.setItem('token', 'abc123');
      localStorage.setItem('user', 'testuser');
      expect(service.logout()).toBeTrue();
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('createUser', () => {
    it('debe crear un usuario', () => {
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

      // Llamar al método de prueba
      service.crearUsuario(usuario).subscribe((data) => {
        expect(data).toEqual({});
      });

      // Esperar a que se haya realizado la petición y devolver una respuesta vacía
      const req = httpMock.expectOne('http://localhost:8080/register');
      expect(req.request.method).toEqual('POST');
      req.flush({});
    });
    }  );
});
