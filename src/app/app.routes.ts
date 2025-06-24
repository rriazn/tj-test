import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./components/login/login.component').then((m) => m.LoginComponent);
        },
    }
];
