import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MailComponent } from './components/mail/mail.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComposeBoxComponent } from './components/mail/compose-box/compose-box.component';
import { FilterSearchComponent } from './components/mail/filter-search/filter-search.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContactBoxComponent } from './components/mail/contact-box/contact-box.component';
import { FolderBoxComponent } from './components/mail/folder-box/folder-box.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MailComponent,
    ComposeBoxComponent,
    FilterSearchComponent,
    ContactBoxComponent,
    FolderBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ClickOutsideModule,
    NgxPaginationModule,
    PasswordStrengthMeterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
