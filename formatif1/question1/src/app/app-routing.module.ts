import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';
import { petGuard69Guard } from './pet-guard69-guard';
import { guardcatsGuard } from './guardcats.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cat', component: CatComponent,  canActivate: [guardcatsGuard ] },
  { path: 'dog', component: DogComponent,  canActivate: [petGuard69Guard]  },
  { path: 'home', component: HomeComponent,  canActivate: [petGuard69Guard]  },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
