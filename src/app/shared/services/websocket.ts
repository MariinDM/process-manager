import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task } from '../../features/tracking/task-interfaces';

@Injectable({
  providedIn: 'root'
})
export class Websocket {
  private socket!: Socket;
  private url = environment.websocketUrl;

  connect(): void {
    this.socket = io(this.url);
  }

  onTaskCreate(): Observable<Task> {
    return new Observable(observer => {
      this.socket.on('taskCreate', data => observer.next(data));
    });
  }

  onTaskUpdate(): Observable<Task> {
    return new Observable(observer => {
      this.socket.on('taskUpdate', data => observer.next(data));
    });
  }

  onTaskDeletion(): Observable<Task> {
    return new Observable(observer => {
      this.socket.on('taskDelete', data => observer.next(data));
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}