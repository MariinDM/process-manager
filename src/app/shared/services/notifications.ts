import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum NotificationPosition {
  TOP_RIGHT = 'toast-top-right',
  TOP_LEFT = 'toast-top-left',
  BOTTOM_RIGHT = 'toast-bottom-right',
  BOTTOM_LEFT = 'toast-bottom-left',
}

@Injectable({
  providedIn: 'root'
})
export class Notifications {

  private toastr = inject(ToastrService);

  showError(title: string, message: string, time: number, positionClass: string): void {
    this.toastr.error(message, title, {
      timeOut: time,
      positionClass: positionClass,
    });
  }

  showSuccess(title: string, message: string, time: number, positonClass: string): void {
    this.toastr.success(message, title, {
      timeOut: time,
      positionClass: positonClass,
    });
  }

  showWarning(title: string, message: string, time: number, positonClass: string): void {
    this.toastr.warning(message, title, {
      timeOut: time,
      positionClass: positonClass,
    });
  }

}
