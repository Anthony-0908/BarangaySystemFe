import { Component, inject } from '@angular/core';
import { ListStore } from './list.store';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',

})
export class ListComponent {
  private store = inject(ListStore)

  ngOnInit(): void { 
    this.store.loadRoles();
  }
}
