import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStore } from './list.store';
import { DataTableComponent } from "../../../shared/components/data-table/data-table.component";
import { ColumnDef, DataTableParams,DataTableResponse} from '../../../shared/components/data-table/data-table.model';
import { Router } from '@angular/router';
import { Role } from '../../../model/role';

type RoleTableRow = Role & {
  permissionsDisplay: string;
};

@Component({
  selector: 'app-list',
  imports: [DataTableComponent, CommonModule],
  templateUrl: './list.component.html',

})

export class ListComponent {

  
  private router = inject(Router)
  private store = inject(ListStore)

  

  columns: ColumnDef<RoleTableRow>[] = [
    { field: 'name', header: 'name', sortable: true, clickable: true },
    { field: 'permissionsDisplay', header: 'permissions', sortable: true },
    { field: 'created_at', header: 'created at', sortable: true },
    { field: 'updated_at' , header: 'updated at', sortable:true}
  ];

  
    fetchRoles = async (params:DataTableParams): Promise<DataTableResponse<RoleTableRow>> => { 
    await this.store.loadRoles(params)

    const data = this.store.roles().map(role =>({
      ...role,
        permissionsDisplay: role.permissions
        ?.map(permission => permission.name)
        .join(' | ') ?? ''
    }))

    return { 
      data,
      total: this.store.total(),
    }
  }

  protected onEdit(role: Role) { 

  }

  protected onDelete(role: Role) { 

  }
  // ngOnInit(): void { 
  //   this.store.loadRoles();
  // }


}
