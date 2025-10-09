import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../menu-items.config';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS } from '../../menu-items.config';
@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.css'
})
export class SidenavbarComponent {
    menuItems: MenuItem[] = [];

  ngOnInit(): void {
    // load menu items (could be filtered by role/permission later)
    this.menuItems = MENU_ITEMS;
  }
  toggleExpand(item: MenuItem)
  {
    item.expanded = !item.expanded
  }
}
