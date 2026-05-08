import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { CuponesComponent } from './pages/cupones/cupones.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { EstudiarComponent } from './pages/estudiar/estudiar.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'catalogo', component: CatalogoComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'reservas', component: ReservasComponent },
    { path: 'cupones', component: CuponesComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'estudiar', component: EstudiarComponent },
    { path: '**', redirectTo: '' }
];