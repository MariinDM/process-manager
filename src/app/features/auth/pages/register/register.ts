import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {

  messageErrors: { key: string, message: string }[] = [
    { key: 'required', message: 'Este campo es obligatorio.' },
    { key: 'email', message: 'Ingresa un email válido.' },
    { key: 'passwordMismatch', message: 'Las contraseñas no coinciden.' }
  ];

  private fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
    } else {
      console.log('Form is invalid');
    }
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
