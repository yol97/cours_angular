import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // 👇 Un interceptor peut se faire injecter un service. Pratique !
  const loading = inject(LoadingService);
  loading.start();

  return next(req).pipe(
    finalize(() => {
      loading.stop();
    })
  );
};
