import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule, // ✅ Needed for [formControl]
    InputTextModule       // ✅ PrimeNG input module (for pInputText)
  ]
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = 'value';
  @Input() type: string = 'text';
  @Input() inputId: string = '';
  @Input() formControl!: FormControl;

  get showErrors(): boolean {
    return this.formControl && this.formControl.invalid && this.formControl.touched;
  }

  get errorMessage(): string {
    const errors = this.formControl.errors;
    if (errors?.['required']) return 'This field is required';
    if (errors?.['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}`;
    if (errors?.['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength}`;
    if (errors?.['email']) return 'Please enter a valid email address';
    return 'Invalid input';
  }
}

