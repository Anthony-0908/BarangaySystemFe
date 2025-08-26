import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/components/table/table.component';
import { UserService } from '../../../core/service/user.service';
import { User } from '../../../model/user';
@Component({
  selector: 'app-index',
  imports: [CommonModule,TableComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  users: User[] = [];

columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    {field:'actions', header:'Actions'}
];

 constructor(private userService: UserService) {}
  ngOnInit() {
     this.loadUsers();
  }

  loadUsers(): void 
  {
    this.userService.getUsers().subscribe({
      next:(data) => {
        console.log('users fetched' , data);
        this.users = data
      },
      error:(err) => console.error('Error fetching users', err)
    })
  }
}
