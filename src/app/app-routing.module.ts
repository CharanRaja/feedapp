import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-form', pathMatch: 'full' },
  { path: 'login-form', component: LoginFormComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-list', component: UserListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
