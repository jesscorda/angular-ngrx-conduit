import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const clonedRequest = req.clone({
    headers: req.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Token ${localStorageService.getToken()}`),
  });

  return next(clonedRequest);
};
