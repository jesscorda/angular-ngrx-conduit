import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterForm } from '../../types/register-user.interface';
import { FormGroup, FormControl, RequiredValidator, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
})
export class RegisterUserComponent {
  registerUserForm = new FormGroup<RegisterForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    age: new FormControl(null, { nonNullable: true, validators: [Validators.required] }),
  });

  registerUser(): void {
    const payload = this.registerUserForm.value;
  }
}
