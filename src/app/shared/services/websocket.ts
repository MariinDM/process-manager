import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Websocket {
  private socket!: Socket;
  private url = environment.websocketUrl;

  connect(): void {
    this.socket = io(this.url);
  }

  onTaskCreate(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('taskCreate', data => observer.next(data));
    });
  }

  onTaskUpdate(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('taskUpdate', data => observer.next(data));
    });
  }

  onTaskDeletion(): Observable<number> {
    return new Observable(observer => {
      this.socket.on('taskDeletion', data => observer.next(data));
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}