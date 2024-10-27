import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ItemData } from '@interfaces';
import { Store } from '@ngrx/store';
import { items as actions } from '@store/actions';
import { generateRandomString } from '@utils';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class RegisterService {
  constructor(
    private store: Store,
    private router: Router,
    private notification: NzNotificationService
  ) {
    //not to do
  }

  private finish(itemId: string) {
    const type = itemId ? 'alterado' : 'cadastrado';
    const message = `Item ${type} com sucesso!`;

    this.notification.success('Informação', message, { nzPlacement: 'topRight' });
    this.router.navigate(['/main/list']);
  }

  public submit(itemId: string, params: ItemData) {
    const finish = (itemId: string) => {
      const type = itemId ? 'alterado' : 'cadastrado';
      const message = `Item ${type} com sucesso!`;

      this.notification.success('Informação', message, { nzPlacement: 'topRight' });
      this.router.navigate(['/main/list']);
    };

    const data = {
      id: itemId || generateRandomString(5),
      name: params?.name!,
      category: params?.category!,
      quantity: params?.quantity!,
      price: params?.price!,
      status: params?.status!
    };

    this.store.dispatch(actions.upsert({ data }));
    this.finish(itemId);
  }
}
