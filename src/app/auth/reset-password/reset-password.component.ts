import { Component } from '@angular/core';
import { InputComponent } from "../../shared/components/input/input.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [InputComponent, ButtonComponent,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {

   protected readonly resetPasswordForm!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]]
    })
  }
  onResetPassword() {
    console.log(this.resetPasswordForm.value)
  }
}
