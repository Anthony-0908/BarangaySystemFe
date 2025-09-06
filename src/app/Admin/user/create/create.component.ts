import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { UserService } from '../../../core/service/user.service';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  userForm!: FormGroup;
  private userService = inject(UserService);
  constructor(private fb: FormBuilder) {
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
    const formValue = this.userForm.value;

    const payload = {
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      email: formValue.email,
      password:formValue.password,
      phone_no: formValue.phoneNo,
      birthdate: formValue.birthdate,
    };

    this.userService.createUser(payload).subscribe({
      next: (res) => {
        console.log('✅ User created successfully:', res);
        this.userForm.reset();
      },
      error: (err) => {
        console.error('❌ Error creating user:', err);
      }
    });
  } else {
    console.log("❌ Form is invalid");
    this.userForm.markAllAsTouched();
  }
}


    // if (this.userForm.valid) {
    //   console.log("✅ Submitted Data:", this.userForm.value);
    // } else {
    //   console.log("❌ Form is invalid");
    //   this.userForm.markAllAsTouched();
    // }
  }

