import { Injectable } from '@angular/core';
import { ItemData } from '@interfaces';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { items as actions } from '@store/actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class ListService {
  private deleted = false;

  constructor(
    private store: Store,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private translateService: TranslateService
  ) {
    //not to do
  }

  private finish(success: boolean) {
    const i18n = this.translateService.instant('ALERTS');
    if (success) {
      this.notification.success(i18n['FINISH-SUCCESS'].TITLE, i18n['FINISH-SUCCESS'].CONTENT, {
        nzPlacement: 'topRight'
      });
    } else {
      this.notification.error(i18n['FINISH-ERROR'].TITLE, i18n['FINISH-ERROR'].CONTENT, {
        nzPlacement: 'topRight'
      });
    }
  }

  public remove(itemId: string) {
    const i18n = this.translateService.instant('ALERTS.CONFIRM-REMOVE');
    this.modal.confirm({
      nzTitle: i18n.TITLE,
      nzContent: i18n.CONTENT,
      nzCancelText: i18n.CANCEL,
      nzOkText: i18n.CONFIRM,
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

  public removeAll(data: string[]) {
    const i18n = this.translateService.instant('ALERTS.CONFIRM-REMOVE-ALL');
    this.modal.confirm({
      nzTitle: i18n.TITLE,
      nzContent: `${i18n.CONTENT} ${data.length}`,
      nzCancelText: i18n.CANCEL,
      nzOkText: i18n.CONFIRM,
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
            this.store.dispatch(actions.removeAll({ data }));
            this.finish(true);
          })
          .catch(() => {
            this.finish(false);
          })
    });
  }

  public toggle(itemId: string, data: ItemData) {
    const handledData = {
      ...data
    };
    this.store.dispatch(
      actions.upsert({
        data: {
          ...data,
          id: itemId,
          status: !handledData.status
        }
      })
    );
  }

  public generateFakeData() {
    this.store.dispatch(actions.generateFakeData());
  }
}
