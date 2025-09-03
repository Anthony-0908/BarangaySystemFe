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
  @Input() type:  'text'| 'password' | 'email' | 'number' = 'text' ;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() variant: 'filled' | 'outlined' | 'standard' = 'filled'; // example variants
  @Input() severity: 'error' | 'success' | 'warning' | '' = '';
  @Input() inputClass: string = '';

  @Output() valueChange = new EventEmitter<string>();


  // Variant styles 
  private variantClass: Record<string, string> =
  {
    filled: 'bg-gray-100 focus:ring fcous:ring-blue-300',
    outlined: 'border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200',
    standard: 'border-b border-gray-300 focus:border-blue-500',
  }

  // Serverity styles 
  private severityClass: Record<string, string> = { 
    error: 'border-red-500 text-red-600 focus:ring-red-200',
    success: 'border-green-500 text-green-600 focus:ring-green-200',
    warning: 'border-yellow-500 text-yellow-600 focus:ring-yellow-200'
  }

   get classes(): string {
    const base = 'w-full px-3 py-2 rounded-md transition focus:outline-none';
    const variantClass = this.variantClass[this.variant] || '';
    const severityClass = this.severityClass[this.severity] || '';
    return `${base} ${variantClass} ${severityClass} ${this.inputClass}`;
  }
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }

  
}
