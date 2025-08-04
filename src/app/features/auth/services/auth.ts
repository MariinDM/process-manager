import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginInterface } from '../interfaces/login-interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RegisterInterface } from '../interfaces/register-interface';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(body: LoginInterface): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, body);
  }

  register(body: RegisterInterface): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, body);
  }

}
