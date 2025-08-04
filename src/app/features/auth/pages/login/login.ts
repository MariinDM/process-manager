import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LocalStorage } from '../../../../shared/services/local-storage';
import { Auth } from '../../services/auth';
import { NotificationPosition, Notifications } from '../../../../shared/services/notifications';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private localStorage = inject(LocalStorage);
  private authService = inject(Auth);
  private readonly notify = inject(Notifications)

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

    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const loginData = this.loginForm.value;
    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.notify.showSuccess('Login successful', response.message, 3000, NotificationPosition.TOP_RIGHT);
        this.localStorage.setItem('accessToken', response.token.accessToken);
        this.router.navigate(['/tracking']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.notify.showError('Login failed', error.error.message, 3000, NotificationPosition.TOP_RIGHT);
      }
    });
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
