import {Component, inject} from '@angular/core';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner-error.html',
  styleUrl: './banner-error.scss'
})
export class BannerError  {
  message = inject(NotificationService).message
  variant = inject(NotificationService).variant
}
