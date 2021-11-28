import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './auth/user.guard';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { UserComponent } from './user/user.component';



const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'login', component: UserComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [UserGuard]
  },

  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
