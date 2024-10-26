import { Routes } from '@angular/router';
import { LivrosComponent } from './pages/livros/livros.component';
import { AssuntosComponent } from './pages/assuntos/assuntos.component';
import { AutoresComponent } from './pages/autores/autores.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';

export const routes: Routes = [
    { path: 'livros', component: LivrosComponent },
    { path: 'assuntos', component: AssuntosComponent },
    { path: 'autores', component: AutoresComponent },
    { path: 'relatorio', component: RelatorioComponent },
    { path: '', redirectTo: 'autores', pathMatch: 'full' },
];
