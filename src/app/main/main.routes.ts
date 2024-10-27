import { Route } from '@angular/router';
import { ListComponent } from './list';
import { RegisterComponent } from './register';

export const MAIN_ROUTES: Route[] = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register/:itemId',
    component: RegisterComponent
  }
];
