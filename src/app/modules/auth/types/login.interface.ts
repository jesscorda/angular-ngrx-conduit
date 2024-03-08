import type { FormControl } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface LoginUserPayload {
  user: {
    email: string;
    password: string;
  };
}
