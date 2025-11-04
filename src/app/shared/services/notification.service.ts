import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class NotificationService {
  message = signal<string | null>(null);
  variant = signal<string | null>(null);

  notify(message: string, variant: string) {
    this.message.set(message);
    this.variant.set(variant);
    setTimeout(() => {
      this.message.set(null);
      this.variant.set(null);
    }, 3000);
  }

  showSuccess = (message: string) => {
    this.notify(message, 'success');
  }

  showInfo(message: string) {
    this.notify(message, 'info');
  }

  showWarning(message: string) {
    this.notify(message, 'warning');
  }

  showError = (message: string) => {
    this.notify(message, 'error');
  }
}
