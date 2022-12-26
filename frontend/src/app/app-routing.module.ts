import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailComponent } from './components/mail';
import { LoginComponent } from './components/login';
import { SignupComponent } from './components/signup';
import { ComposeBoxComponent } from './components/mail/compose-box/compose-box.component';

const routes: Routes = [
  { path: 'mail', component: MailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent,
    children: [
      {path: 'compose', component: ComposeBoxComponent}
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
