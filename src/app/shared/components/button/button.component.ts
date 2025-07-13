import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label = 'Click Me';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color : 'primary' | 'success' | 'danger' | 'outline' = 'primary';
  @Input() icon?: string;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() userPrime = false;


  @Output() clicked = new EventEmitter<void>();

  get buttonClass():string{

    const base = `inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded transition-all duration-150`

    const colorMap:Record<string, string> = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
    }



    return `${base } ${colorMap[this.color]}`;
  }
}
