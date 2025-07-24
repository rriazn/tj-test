import { Routes } from '@angular/router';
import { createCompetitionGuard } from './guards/create-competition.guard';

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
        canMatch: [createCompetitionGuard],
        loadComponent: () => {
            return import('./components/create-competition/create-competition.component').then((m) => m.CreateCompetitionComponent);
        }
    },
    {
        path: 'execute-competition',
        pathMatch: 'full',
        canMatch: [createCompetitionGuard],
        loadComponent: () => {
            return import('./components/execute-competition/execute-competition.component').then((m) => m.ExecuteCompetitionComponent);
        }
    }
];
