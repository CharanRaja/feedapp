import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedsListComponent } from './feeds-list/feeds-list.component';
import { FeedsComponent } from './feeds/feeds.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/user-create', pathMatch: 'full' },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'feeds-create', component: FeedsComponent },
  { path: 'feeds-list', component: FeedsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
