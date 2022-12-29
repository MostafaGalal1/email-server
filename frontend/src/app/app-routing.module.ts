import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailComponent } from './components/mail';
import { LoginComponent } from './components/login';
import { SignupComponent } from './components/signup';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'mail', component: MailComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
