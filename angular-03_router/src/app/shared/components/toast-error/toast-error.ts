import {Component, inject} from '@angular/core';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast-error.html',
  styleUrl: './toast-error.scss'
})
export class ToastError  {
  message = inject(NotificationService).message
  variant = inject(NotificationService).variant
}
