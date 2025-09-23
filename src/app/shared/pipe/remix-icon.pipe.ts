import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remixIcon',
  standalone: true
})
export class RemixIconPipe implements PipeTransform {
  transform(iconName: string, style: string = 'line'): string {
    return `ri-${iconName}-${style}`;
  }
}
