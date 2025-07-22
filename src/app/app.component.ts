import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from './shared/components/shared/shared.module';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,SharedModule,ReactiveFormsModule],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'barangaySystem';
}


