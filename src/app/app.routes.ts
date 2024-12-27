import { Routes } from '@angular/router';
import { ClientesComponent } from './pages/client/clientes.component';
import { GoogleMapsComponent } from './pages/google-maps/google-maps.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children: [
            {path: 'dashboard', component: ClientesComponent},
            {path: 'google-maps', component: GoogleMapsComponent},
            {path: 'progress', component: ProgressComponent},
            {path: 'grafica1', component: Grafica1Component},
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            // {path: '', component: ClientesComponent, pathMatch: 'full'},
        ]
    },

    {path: '**', component: NopagefoundComponent},
    // {path: 'google-maps', loadComponent: () => import('../app/pages/google-maps/google-maps.component').then(mod => mod.GoogleMapsComponent)}
];
