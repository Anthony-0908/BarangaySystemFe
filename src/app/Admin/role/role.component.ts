import { Component, inject } from '@angular/core';
import { RolesService } from '../../core/service/roles.service';
import { RolesStore } from './role.store';
@Component({
  selector: 'app-role',
  imports: [],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  private rolesStore = inject(RolesStore);


  
 ngOnInit() {
    this.rolesStore.loadRoles().then(() => {
      // ✅ Call the signal as a function to read its value
      console.log('Roles from store:', this.rolesStore.roles());
    });
  }
}
