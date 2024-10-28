import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { items as selectors } from '@store/selectors';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NzSpaceModule,
    NzCheckboxModule,
    NzGridModule,
    NzButtonModule,
    NzLayoutModule,
    NzDividerModule,
    RouterModule,
    TranslateModule,
    NzStatisticModule,
    NzCardModule
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  providers: [provideNgxMask()]
})
export class SummaryComponent {
  _data$ = this.store.select(selectors.selectSummary());

  constructor(private store: Store) {
    //not to do
  }
}
