
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [CommonModule, ButtonComponent,InputComponent,ReactiveFormsModule],
  exports: [ButtonComponent,InputComponent]
})
export class SharedModule {}
