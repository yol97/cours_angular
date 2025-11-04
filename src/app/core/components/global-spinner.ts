// core/components/global-spinner.ts
import { Component, inject } from '@angular/core';
import {LoadingService} from '../services/loading.service';


@Component({
  selector: 'global-spinner',
  template: `
    @if (loading()) {
      <div class="backdrop">
        <div class="spinner"></div>
      </div>
    }
  `,
  styles: [`
    .backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.2); display:flex; align-items:center; justify-content:center; }
    .spinner { width:50px; height:50px; border:5px solid #ccc; border-top-color:#333; border-radius:50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class GlobalSpinner {
  loading = inject(LoadingService).loading;
}
