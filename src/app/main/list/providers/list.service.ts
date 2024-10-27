import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { items as actions } from '@store/actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class ListService {
  private deleted = false;

  constructor(
    private store: Store,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {
    //not to do
  }

  private finish(success: boolean) {
    if (success) {
      this.notification.success('Informação', 'Item removido com sucesso', {
        nzPlacement: 'topRight'
      });
    } else {
      this.notification.error(
        'Informação',
        'Problemas ao remover o item (esta é uma mensagem proposital)',
        {
          nzPlacement: 'topRight'
        }
      );
    }
  }

  public remove(itemId: string) {
    this.modal.confirm({
      nzTitle: 'Confirmação de ação',
      nzContent: 'Ao confirmar, o registro será removido permanentemente',
      nzOnOk: () =>
        new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (this.deleted) {
              this.deleted = false;
              reject();
            } else {
              this.deleted = true;
              resolve();
            }
          }, 1000);
        })
          .then(() => {
            this.store.dispatch(actions.remove({ itemId }));
            this.finish(true);
          })
          .catch(() => {
            this.finish(false);
          })
    });
  }
}
