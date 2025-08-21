import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';
@Component({
  selector: 'app-master-layout',
  imports: [RouterOutlet,NavbarComponent, SidenavbarComponent, CommonModule],
  templateUrl: './master-layout.component.html',
  styleUrl: './master-layout.component.css'
})
export class MasterLayoutComponent {

}
