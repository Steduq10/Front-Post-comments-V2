import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPostsComponent } from './main-posts/main-posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  {path: 'main', component: MainPostsComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: PostDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
