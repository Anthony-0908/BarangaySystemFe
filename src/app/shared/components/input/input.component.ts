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
    ReactiveFormsModule,
    InputTextModule
  ]
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() ariaLabel: string = '';
  @Input() type: string = 'text';
  @Input() inputId: string = Math.random().toString(36).substr(2, 9); // Generate random ID if not provided
  @Input() formControl!: FormControl;
  @Input() required: boolean = false;

  getAriaLabel(): string {
    if (this.label) return ''; // Don't need aria-label if visible label exists
    return this.ariaLabel || this.placeholder || 'Input field';
  }

  get showErrors(): boolean {
    return this.formControl && this.formControl.invalid && this.formControl.touched;
  }

  get errorMessage(): string {
    const errors = this.formControl.errors;
    if (errors?.['required']) return 'This field is required';
    if (errors?.['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}`;
    if (errors?.['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength}`;
    return 'Invalid input';
  }
}
