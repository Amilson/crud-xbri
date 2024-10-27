import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as effects from '@store/effects';
import * as reducers from '@store/reducers';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main/list' },
  {
    path: 'main',
    loadChildren: () => import('./main/main.routes').then((m) => m.MAIN_ROUTES),
    providers: [
      provideState({
        name: reducers.items.featureKey,
        reducer: reducers.items.reducer
      }),
      provideEffects(effects.ItemsEffects)
    ]
  }
];
