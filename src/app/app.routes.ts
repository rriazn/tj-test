import { Routes } from '@angular/router';
import { checkAdminGuard } from './guards/check-admin.guard';

export const routes: Routes = [
    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./components/login/login.component').then((m) => m.LoginComponent);
        },
    },
    {
        path: 'manage-competitions',
        pathMatch: 'full',
        canMatch: [checkAdminGuard],
        loadComponent: () => {
            return import('./components/create-competition/create-competition.component').then((m) => m.CreateCompetitionComponent);
        }
    },
    {
        path: 'execute-competition',
        pathMatch: 'full',
        canMatch: [checkAdminGuard],
        loadComponent: () => {
            return import('./components/execute-competition/execute-competition.component').then((m) => m.ExecuteCompetitionComponent);
        }
    },
    {
        path: 'execute-group-admin',
        pathMatch: 'full',
        canMatch: [checkAdminGuard],
        loadComponent: () => {
            return import('./components/admin-active-group/admin-active-group.component').then((m) => m.AdminActiveGroupComponent);
        }
    },
    {
        path: 'manage-judges',
        pathMatch: 'full',
        canMatch: [checkAdminGuard],
        loadComponent: () => {
            return import('./components/manage-judges/manage-judges.component').then((m) => m.ManageJudgesComponent);
        }
    }
];
