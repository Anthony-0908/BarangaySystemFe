import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ListStore } from './list.store';
import { DataTableComponent } from "../../../shared/components/data-table/data-table.component";
import { ColumnDef, DataTableParams,DataTableResponse} from '../../../shared/components/data-table/data-table.model';
import { Router } from '@angular/router';
import { Role } from '../../../model/role';
@Component({
  selector: 'app-list',
  imports: [DataTableComponent, CommonModule],
  templateUrl: './list.component.html',

})
export class ListComponent {
  // private router = inject(Router)
  // private store = inject(ListStore)

  // columns:ColumnDef<Role>[] =[
    
  // ]
  
  // ngOnInit(): void { 
  //   this.store.loadRoles();
  // }


}
