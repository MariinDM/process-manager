import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`, {});
  }

  getTasksByStatus(status?: string, limit?: string, active: boolean = true): Observable<any> {
    if (status && limit) {
      return this.http.get(`${this.apiUrl}/tasks?status=${status}&limit=${limit}`, {});
    } else if (status) {
      return this.http.get(`${this.apiUrl}/tasks?status=${status}&active=${active}`, {});
    } else if (limit) {
      return this.http.get(`${this.apiUrl}/tasks?limit=${limit}&active=${active}`, {});
    } else {
      return this.http.get(`${this.apiUrl}/tasks&active=${active}`, {});
    }
  }

}
