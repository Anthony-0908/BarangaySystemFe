
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,   // ✅ Standalone component must be imported
    ButtonComponent   // ✅ Also standalone
  ],
  exports: [
    InputComponent,   // ✅ Export it AFTER it's imported
    ButtonComponent
  ]
})
export class SharedModule {}
