import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./features/auth/auth-routing').then(m => m.authRoutes) },
    { path: 'tracking', loadChildren: () => import('./features/tracking/tracking-routing').then(m => m.trackingRoutes) },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' }
];
