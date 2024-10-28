import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemData } from '@interfaces';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes';
import { items as selectors } from '@store/selectors';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FilterComponent } from './filter';
import { ListService } from './providers';
import { SummaryComponent } from './summary';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzDividerModule,
    RouterModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    TranslateModule,
    NzGridModule,
    PipesModule,
    FilterComponent,
    SummaryComponent,
    NzSwitchModule,
    NzDropDownModule,
    NzToolTipModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ListService]
})
export class ListComponent {
  _data$ = this.store.select(selectors.selectAll);

  _openFilter = false;

  _openSummary = false;

  _canMakeAction = true;

  _checked = false;

  _setOfCheckedId = new Set<string>();

  constructor(
    private store: Store,
    private service: ListService,
    private cdr: ChangeDetectorRef
  ) {
    //not to do
  }

  private updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this._setOfCheckedId.add(id);
    } else {
      this._setOfCheckedId.delete(id);
    }
  }

  onHandleDelete(itemId: string) {
    this.service.remove(itemId);
  }

  onHandleDeleteAll() {
    const dataToDelete = Array.from(this._setOfCheckedId);
    this.service.removeAll(dataToDelete);
    this._setOfCheckedId.clear();
    this._checked = false;
    this.cdr.markForCheck();
  }

  onHandleToggle(itemId: string, data: ItemData) {
    this.service.toggle(itemId, data);
  }

  onHandleFilter() {
    this._openFilter = !this._openFilter;
  }

  onHandleSummary() {
    this._openSummary = !this._openSummary;
  }

  onHandleDataToFilter(event: any) {
    this._data$ = this.store.select(selectors.selectAllBySearch({ ...event }));
  }

  onHandleFakeData() {
    this.service.generateFakeData();
  }

  onAllChecked(checked: boolean, data: ItemData[]): void {
    data.forEach(({ id }) => this.updateCheckedSet(id!, checked));
    this._checked = checked;
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }
}
