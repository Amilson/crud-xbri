import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryEnums } from '@enums';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
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
    TranslateModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [provideNgxMask()]
})
export class FilterComponent implements OnInit {
  @Output() filter = new EventEmitter();

  @Output() close = new EventEmitter();

  _form = this.fb.group({
    name: ['', [Validators.maxLength(70)]],
    category: [''],
    quantity: [''],
    price: [''],
    status: [true]
  });

  _categories = Object.keys(CategoryEnums);

  private subscription = new Subscription();

  constructor(private fb: FormBuilder) {
    //not to do
  }

  ngOnInit() {
    this.subscription.add(
      this._form.valueChanges.pipe(debounceTime(400)).subscribe((resp) => {
        this.filter.next(resp);
      })
    );
  }

  onClear() {
    this._form.patchValue({
      name: '',
      category: '',
      quantity: '',
      price: '',
      status: true
    });
  }
}
