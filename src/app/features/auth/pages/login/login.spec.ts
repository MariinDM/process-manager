import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // =====================================
  // VALIDATION TESTS
  // =====================================
  describe('getControlError method', () => {

    it('should return error message when email is invalid', () => {
      // ARRANGE (Preparar) - Configuramos el escenario
      const emailControl = component.loginForm.get('email'); // Obtenemos el control del email
      emailControl?.setValue('email-invalido');              // Le ponemos un valor inválido
      emailControl?.markAsTouched();                         // Simulamos que el usuario lo tocó

      // ACT (Actuar) - Ejecutamos la función que queremos probar
      const result = component.getControlError('email');

      // ASSERT (Verificar) - Comprobamos que el resultado es el esperado
      expect(result).toBe('Ingresa un email válido.');
    });

  });
});
