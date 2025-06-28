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
        path: 'create-competition',
        pathMatch: 'full',
        canMatch: [createCompetitionGuard],
        loadComponent: () => {
            return import('./components/create-competition/create-competition.component').then((m) => m.CreateCompetitionComponent);
        }
    }
];
