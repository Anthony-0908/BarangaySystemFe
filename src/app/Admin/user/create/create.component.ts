import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { UserService } from '../../../core/service/user.service';
import { CaseMapperService } from '../../../core/service/case-mapper.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  userForm!: FormGroup;
  private userService = inject(UserService);
  constructor(private fb: FormBuilder,   private caseMapper: CaseMapperService) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]],
      phone_no: [''],
      birthdate: [''],
    });
  }
 onSubmit() {
    if (this.userForm.valid) {
      // ✅ Convert Angular form values (camelCase) → Laravel (snake_case)
      const payload = this.caseMapper.toSnakeCase(this.userForm.value);
      this.userService.createUser(payload).subscribe({
        next: (res) => {
          console.log('✅ User created successfully:', res);
          this.userForm.reset();
        },
        error: (err) => {
          console.error('❌ Error creating user:', err);
          if (err.error?.errors) {
            // ✅ Convert errors snake_case → camelCase
            const errors = this.caseMapper.toCamelCase(err.error.errors);

            Object.keys(errors).forEach((field) => {
              const control = this.userForm.get(field);
              if (control) {
                control.setErrors({ serverError: errors[field][0] });
              }
            });
          }
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  }

