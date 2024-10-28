import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ItemData } from '@interfaces';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { items as actions } from '@store/actions';
import { generateRandomString } from '@utils';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class RegisterService {
  constructor(
    private store: Store,
    private router: Router,
    private notification: NzNotificationService,
    private translateService: TranslateService
  ) {
    //not to do
  }

  private finish() {
    const i18n = this.translateService.instant('ALERTS.OPERATION');

    this.notification.success(i18n.TITLE, i18n.CONTENT, { nzPlacement: 'topRight' });
    this.router.navigate(['/main/list']);
  }

  public submit(itemId: string, params: ItemData) {
    const data = {
      id: itemId || generateRandomString(5),
      name: params?.name!,
      category: params?.category!,
      quantity: params?.quantity!,
      price: params?.price!,
      status: params?.status!
    };

    this.store.dispatch(actions.upsert({ data }));
    this.finish();
  }
}
