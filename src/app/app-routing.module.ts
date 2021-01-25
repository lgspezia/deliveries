import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettlementListComponent } from './components/settlement-list/settlement-list.component';
import { SettlementsDetailComponent } from './components/settlement-detail/settlement-detail.component';
import { SettlementNotFoundComponent } from './components/settlement-not-found/settlement-not-found.component';

const routes: Routes = [
  {path: 'settlement-list', component: SettlementListComponent, data: { animation: 'isRight' }},
  {path: 'settlement-detail', component: SettlementsDetailComponent, data: { animation: 'isLeft' }},
  {path: '', redirectTo: '/settlement-list', pathMatch: 'full'},
  {path: '**', component: SettlementNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
