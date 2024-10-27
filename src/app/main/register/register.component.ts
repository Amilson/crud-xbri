import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Input as RouterInput } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { items as selectors } from '@store/selectors';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Subscription } from 'rxjs';
import { RegisterService } from './providers';

@Component({
  selector: 'app-register',
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
    NzNotificationModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideNgxMask(), RegisterService]
})
export class RegisterComponent implements OnInit, OnDestroy {
  @RouterInput('itemId') itemId!: string;

  _form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(70)]],
    category: ['', [Validators.required]],
    quantity: [0, [Validators.required]],
    price: [0, [Validators.required]],
    status: [true, [Validators.required]]
  });

  _categories = [
    { label: 'CAR', value: 'CAR' },
    { label: 'TRUCK', value: 'TRUCK' },
    { label: 'PLANE', value: 'PLANE' }
  ];

  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private service: RegisterService
  ) {
    //not to do
  }

  ngOnInit() {
    this.subscription.add(
      this.store.select(selectors.selectOne({ id: this.itemId })).subscribe((resp) => {
        this._form.patchValue(resp);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this._form.valid) {
      const { value } = this._form;

      const data = {
        name: value?.name!,
        category: value?.category!,
        quantity: value?.quantity!,
        price: value?.price!,
        status: value?.status!
      };

      this.service.submit(this.itemId, data);
    } else {
      Object.values(this._form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onHandleStatus(status: boolean) {
    const setValidators = (ctrl: AbstractControl, validators: ValidatorFn[]) => {
      if (validators.length) {
        ctrl.setValidators(validators);
      } else {
        ctrl.clearValidators();
      }

      ctrl.updateValueAndValidity();
    };

    if (status) {
      setValidators(this._form.controls['price'], [Validators.required]);
      setValidators(this._form.controls['quantity'], [Validators.required]);
    } else {
      setValidators(this._form.controls['price'], []);
      setValidators(this._form.controls['quantity'], []);
    }
  }
}
