import { Login } from './login/login';
import { PanelAdmin } from './panel-admin/panel-admin';
export const routes = [
    {
        path: '',
        component: Login,
    },
    {
        path: 'panel-admin',
        component: PanelAdmin,
    },
];
