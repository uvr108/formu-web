import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntarioCreateComponent } from './voluntario-create/voluntario-create.component';
import { VoluntarioListComponent } from './voluntario-list/voluntario-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-employee' },
  { path: 'create', component: VoluntarioCreateComponent },
  { path: 'list', component: VoluntarioListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
