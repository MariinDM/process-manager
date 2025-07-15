import { Routes } from "@angular/router";

export const authRoutes: Routes = [

    {
        path: '',
        loadComponent: () => import('./layout/auth-layout/auth-layout').then(m => m.AuthLayout),
        children: [
            { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
            { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
        ]
    }
];