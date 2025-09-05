import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ⬅️ Import CommonModule for ngClass

@Component({
  selector: 'app-input',
  standalone: true, // ⬅️ Make standalone so it can import its own deps
  imports: [CommonModule], // ⬅️ Add CommonModule here
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: 'text' | 'password' | 'email' | 'number' | 'date' = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() variant: 'filled' | 'outlined' | 'standard' = 'filled';
  @Input() severity?: 'error' | 'success' | 'warning' | '' = '';
  @Input() inputClass: string = '';

  value: string = '';

  // Angular form callbacks
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  // Dynamic classes
  get classes(): string {
    const base = 'w-full px-3 py-2 rounded-md transition focus:outline-none';
    const variantClass =
      {
        filled: 'bg-gray-100 focus:ring focus:ring-blue-300',
        outlined:
          'border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200',
        standard: 'border-b border-gray-300 focus:border-blue-500',
      }[this.variant] || '';
    const severityClass =
      {
        error: 'border-red-500 text-red-600 focus:ring-red-200',
        success: 'border-green-500 text-green-600 focus:ring-green-200',
        warning: 'border-yellow-500 text-yellow-600 focus:ring-yellow-200',
        '': '',
      }[this.severity ?? ''] || '';
    return `${base} ${variantClass} ${severityClass} ${this.inputClass}`;
  }
}
