import { Component } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  notificaciones!: ReturnType<NotificationService['notificacionesSignal']>;

  constructor(private notificationService: NotificationService) {
    this.notificaciones = this.notificationService.notificacionesSignal();
  }

  cerrar(id: number) {
    this.notificationService.cerrar(id);
  }
}
