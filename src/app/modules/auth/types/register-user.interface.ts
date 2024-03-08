import type { FormControl } from '@angular/forms';

export interface RegisterForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterUserPayload {
  user: {
    username: string;
    email: string;
    password: string;
  };
}
