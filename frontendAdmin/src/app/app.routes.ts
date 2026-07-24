import { Routes } from '@angular/router';
import { Login } from './login/login';
import { PanelAdmin } from './panel-admin/panel-admin';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'panel-admin',
    component: PanelAdmin,
  },
];
