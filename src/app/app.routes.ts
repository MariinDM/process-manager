import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';
import { accessGuard } from './shared/guards/access-guard';

export const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./features/auth/auth-routing').then(m => m.authRoutes), canActivate: [authGuard] },
    { path: 'tracking', loadChildren: () => import('./features/tracking/tracking-routing').then(m => m.trackingRoutes), canActivate: [accessGuard] },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' }
];
