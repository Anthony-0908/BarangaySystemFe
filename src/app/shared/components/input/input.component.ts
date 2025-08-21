import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-input',
  imports:[CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'] // or use inline styles
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() variant: 'filled' | 'outlined' | 'standard' = 'filled'; // example variants
  @Input() severity: 'error' | 'success' | 'warning' | '' = '';
  @Input() inputClass: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }

  get severityClass(): string {
    switch (this.severity) {
      case 'error':
        return 'border-red-500 text-red-600';
      case 'success':
        return 'border-green-500 text-green-600';
      case 'warning':
        return 'border-yellow-500 text-yellow-600';
      default:
        return '';
    }
  }

  get variantClass(): string {
    switch (this.variant) {
      case 'filled':
        return 'bg-gray-100';
      case 'outlined':
        return 'border border-gray-300';
      case 'standard':
        return 'border-b border-gray-300';
      default:
        return '';
    }
  }
}
