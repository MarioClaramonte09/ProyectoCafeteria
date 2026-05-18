import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { CuponesComponent } from './pages/cupones/cupones.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NotFoundComponent } from './pages/not-found/not-found';
import { ProductoComponent } from './pages/producto/producto.component';
import { PagoComponent } from './pages/pago/pago.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'catalogo', component: CatalogoComponent },
    { path: 'catalogo/:id', component: ProductoComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'reservas', component: ReservasComponent },
    { path: 'cupones', component: CuponesComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'pago', component: PagoComponent },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'registro', component: RegistroComponent }
        ]
    },
    { path: '**', component: NotFoundComponent }
];