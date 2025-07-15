import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private fb = inject(FormBuilder);

  messageErrors: { key: string, message: string }[] = [
    { key: 'required', message: 'Este campo es obligatorio.' },
    { key: 'email', message: 'Ingresa un email válido.' },
    { key: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' }
  ];

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Data:', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  getControlError(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      for (const error of this.messageErrors) {
        if (control.hasError(error.key)) {
          return error.message;
        }
      }
    }
    return null;
  }
}
