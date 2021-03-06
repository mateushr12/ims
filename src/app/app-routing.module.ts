import { TipoComponent } from './components/tipo/tipo.component';
import { ContaComponent } from './components/conta/conta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstrategiaComponent } from './components/estrategia/estrategia.component';
import { NewComponent } from './components/portfolio/new/new.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const routes: Routes = [
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'novo-portfolio', component: NewComponent },
  { path: 'estrategia', component: EstrategiaComponent },
  { path: 'conta', component: ContaComponent },
  { path: 'tipo', component: TipoComponent },
  { path: '', redirectTo: '/portfolio', pathMatch: 'full' },
  { path: '**', redirectTo: '/portfolio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
