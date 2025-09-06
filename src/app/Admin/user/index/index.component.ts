import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/components/table/table.component';
import { UserService } from '../../../core/service/user.service';
import { User } from '../../../model/user';
import { IndexStore } from './index.store';
import { ColumnDef, DataTableParams,DataTableResponse} from '../../../shared/components/data-table/data-table.model';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  standalone:true,
  imports: [CommonModule,DataTableComponent],
  templateUrl: './index.component.html',

})
export class IndexComponent  {

  private router = inject(Router);
  store = inject(IndexStore);

  columns: ColumnDef<User>[] = [
    { field: 'first_name', header: 'First Name', sortable: true, clickable: true },
    { field: 'last_name', header: 'Last Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
  ];

fetchUsers = async (params: DataTableParams): Promise<DataTableResponse<User>> => {
  await this.store.loadUsers(params);

  // ✅ read from signals
  return {
    data: this.store.users(),
    total: this.store.total(),
  };
};

  onEdit(user: User) {
    this.store.setSelected(user);
    this.router.navigate(['/users', user.id, 'edit']);
  }

  onDelete(user: User) {
    this.store.deleteUser(user.id);
  }
}
