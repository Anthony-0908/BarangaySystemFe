import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexStore } from '../index/index.store';
import { User } from '../../../model/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [CommonModule,ReactiveFormsModule, InputComponent,ButtonComponent],
  templateUrl: './update.component.html',

})
export class UpdateComponent  {
  protected userForm!: FormGroup;
  private store = inject(IndexStore);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) {
    this.store.loadUserById(id).then(() => {
      const selectedUser = this.store.selectedUser();
      if (selectedUser) {
        this.userForm.patchValue({
          firstName: selectedUser.first_name,
          lastName: selectedUser.last_name,
          email: selectedUser.email,
          birthdate: selectedUser.birthdate,
        });
      }
    });
  }

  this.userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    birthdate: [''],
  });
}


  onSubmit() {
    if (this.userForm.valid && this.store.selectedUser()) {
      const id = this.store.selectedUser()!.id;
      const formValue = this.userForm.value;

      this.store.updateUser(id, {
        first_name: formValue.firstName,
        last_name: formValue.lastName,
        email: formValue.email,
        password: formValue.password || undefined,
        birthdate: formValue.birthdate,
      });
    }
  }
}
