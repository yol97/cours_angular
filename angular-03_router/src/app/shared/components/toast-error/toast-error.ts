// shared/components/toast-error.ts
import {Component, inject} from '@angular/core';
import {ErrorService} from '../../../core/services/error.service';

@Component({
  selector: 'toast-error',
  template: `
		  @if(error()) {
			  <div>{{ error() }}</div>
		  }
  `,
  styles: [`div { background:red; color:white; padding:0.5rem; }`]
})
export class ToastError {
  error = inject(ErrorService).error;
}
