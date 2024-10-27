import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { items as selectors } from '@store/selectors';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ListService } from './providers';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzDividerModule, RouterModule, NzModalModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ListService]
})
export class ListComponent {
  _data$ = this.store.select(selectors.selectAll);

  constructor(
    private store: Store,
    private service: ListService
  ) {
    //not to do
  }

  onHandleDelete(itemId: string) {
    this.service.remove(itemId);
  }
}
