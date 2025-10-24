// shared/services/logger-error
import {ErrorService} from '../../core/services/error.service';
import {effect, inject, Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerError {
  constructor() {
    const errorService = inject(ErrorService);
    effect(() => {
      const err = errorService.error();
      if (err) {
        console.log('Send to Sentry:', err);
        // sentry.captureMessage(err);
      }
    });
  }
}
