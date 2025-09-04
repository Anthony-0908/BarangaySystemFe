import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,   // ✅ Required for loadComponent
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: [''],
    });
  }

  onSubmit() {
    console.log(this.userForm.value);
  }
}
