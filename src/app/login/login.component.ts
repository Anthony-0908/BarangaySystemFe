import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// PrimeNG imports
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputComponent } from "../shared/components/input/input.component";
import { ButtonComponent } from "../shared/components/button/button.component";

import { AuthStore } from '../core/store/auth.store';
@Component({
  selector: 'app-login',
   standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // For [formGroup], formControlName
    InputTextModule, // For pInputText
    PasswordModule, // For p-password
    ButtonModule, // For p-button
    CheckboxModule,
    InputComponent,
    ButtonComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 private fb = inject(FormBuilder);
  private auth = inject(AuthStore);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.auth.login(email, password); // ✅ Call store login
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Getters for template validation
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  // For binding loading & error states in template
  get loading() { return this.auth.loading(); }
  get error() { return this.auth.error(); }
}
