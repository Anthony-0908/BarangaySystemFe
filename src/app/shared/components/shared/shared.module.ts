
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../table/table.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,   // ✅ Standalone component must be imported
    ButtonComponent,   // ✅ Also standalone\
    TableComponent,
  ],
  exports: [
    InputComponent,   // ✅ Export it AFTER it's imported
    ButtonComponent,
    TableComponent,
  ]
})
export class SharedModule {}
