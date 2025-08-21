import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// PrimeNG imports
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputComponent } from "../shared/components/input/input.component";
import { ButtonComponent } from "../shared/components/button/button.component";

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
   loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Login attempt:', this.loginForm.value);
        this.loading = false;
        // Handle successful login here
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  // Getter methods for easy access to form controls
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
