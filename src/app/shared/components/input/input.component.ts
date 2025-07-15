import { Component, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label:string = '';
  @Input() placeholder:string = '';
  @Input() type:string = 'text';
  @Input() inputId:string = '';
  @Input() formControl!:FormControl;


  get showErrors(): boolean{
    return this.formControl && this.formControl.invalid && this.formControl.touched;
  }

  get errorMessage(): string {
    const errors = this.formControl.errors;
    if(errors?.['required']){
      return 'This field is required';
    }

      if(errors?.['minlength']){
      return `Minimum length is ${errors['minlength'].requiredLength}`;
    }

      if(errors?.['maxlength']){
      return `Maximum length is ${errors['maxlength'].requiredLength}`;
    }

      if(errors?.['email']){
      return `Please enter a valid email address`;
    }
      return 'Invalid input';
  }




}
