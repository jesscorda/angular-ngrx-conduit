import type { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToastsService } from '../../services/toastr/toastr.service';

export const backendErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastsService = inject(ToastsService);
  return next(req).pipe(
    catchError(response => {
      if (response instanceof HttpErrorResponse) {
        const spaceChar = ' ';
        const newLineChar = '\n';
        const errMessage = Object.entries(response.error.errors)
          .map(a => a.join(spaceChar))
          .join(newLineChar);
        toastsService.showErrorMessage(errMessage, response.name);
      }
      throw response.error.errors;
    }),
  );
};
