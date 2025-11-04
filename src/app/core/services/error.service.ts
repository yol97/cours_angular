// core/services/error.service.ts
import { Injectable, signal } from '@angular/core';
import { ToastError } from '../../shared/components/toast-error/toast-error'

@Injectable({ providedIn: 'root' })
export class ErrorService {
  error = signal<string | null>(null);

  notify(message: string) {
    this.error.set(message);
  }
}
