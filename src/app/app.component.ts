import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { SharedModule } from './shared/components/shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonModule,SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'barangaySystem';
}
