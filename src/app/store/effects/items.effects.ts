import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { items as itemsActions } from '@store/actions';
import * as services from '@store/services';
import { map } from 'rxjs/operators';

@Injectable()
export class ItemsEffects {
  load$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(itemsActions.load),
        map(() => {
          this.service.load();
        })
      );
    },
    {
      dispatch: false
    }
  );

  constructor(
    private actions$: Actions,
    private service: services.ItemsService
  ) {
    // not to do
  }
}
