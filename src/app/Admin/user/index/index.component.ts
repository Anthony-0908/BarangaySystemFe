import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/components/table/table.component';
import { UserService } from '../../../core/service/user.service';
import { User } from '../../../model/user';
import { IndexStore } from './index.store';
@Component({
  selector: 'app-index',
  imports: [CommonModule],
  templateUrl: './index.component.html',

})
export class IndexComponent implements OnInit {

  store = inject(IndexStore)

// columns = [
//     { field: 'id', header: 'ID' },
//     { field: 'name', header: 'Name' },
//     { field: 'email', header: 'Email' },
//     {field:'actions', header:'Actions'}
// ];

//  constructor(private userService: UserService) {}
  ngOnInit():void {
     this.store.loadUsers();
  }

  // loadUsers(): void 
  // {
  //   this.userService.getUsers().subscribe({
  //     next:(data) => {
  //       console.log('users fetched' , data);
  //       this.users = data
  //     },
  //     error:(err) => console.error('Error fetching users', err)
  //   })
  // }
}
