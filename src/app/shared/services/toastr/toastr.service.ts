import { Injectable, inject } from '@angular/core';
import type { ActiveToast } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  private _toastr = inject(ToastrService);

  showErrorMessage(errorMessage: string, title: string): ActiveToast<void> {
    return this._toastr.error(errorMessage, title);
  }

  showSuccessMessage(errorMessage: string, title: string): ActiveToast<void> {
    return this._toastr.success(errorMessage, title);
  }
}
