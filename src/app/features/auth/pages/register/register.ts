import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { LocalStorage } from '../../../../shared/services/local-storage';
import { Auth } from '../../services/auth';
import { NotificationPosition, Notifications } from '../../../../shared/services/notifications';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {

  private fb = inject(FormBuilder);
  private router = inject(Router)
  private localStorage = inject(LocalStorage);
  private authService = inject(Auth);
  private readonly notify = inject(Notifications);

  messageErrors: { key: string, message: string }[] = [
    { key: 'required', message: 'Este campo es obligatorio.' },
    { key: 'email', message: 'Ingresa un email válido.' },
    { key: 'passwordMismatch', message: 'Las contraseñas no coinciden.' }
  ];

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.notify.showWarning('¡Precaución!', 'Por favor, completa todos los campos correctamente.', 3000, NotificationPosition.TOP_RIGHT);
      return;
    }

    const registerData = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.notify.showSuccess('¡Registro exitoso!', response.message, 3000, NotificationPosition.TOP_RIGHT);
        this.localStorage.setItem('accessToken', response.token.accessToken);
        this.router.navigate(['/tracking']);
      },
      error: (error) => {
        this.notify.showError('¡Error!', error.error.message, 3000, NotificationPosition.TOP_RIGHT);
      }
    });
  }

  getControlError(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    if (control && control.invalid && (control.dirty || control.touched)) {

      if (control.hasError('minlength')) {
        const requiredLength = control.errors?.['minlength']?.requiredLength;
        return `La longitud mínima debe ser ${requiredLength} caracteres.`;
      }

      for (const error of this.messageErrors) {
        if (control.hasError(error.key)) {
          return error.message;
        }
      }
    }

    if (controlName === 'confirmPassword' && this.registerForm.hasError('passwordMismatch') &&
      (control?.dirty || control?.touched)) {
      return 'Las contraseñas no coinciden.';
    }

    return null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

}
