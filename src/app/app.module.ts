import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { PickupComponent } from './component/pickup/pickup.component';
import { DeliveryComponent } from './component/delivery/delivery.component';
import { TrackComponent } from './component/track/track.component';
import { LoginComponent } from './component/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    FooterComponent,
    HeaderComponent,
    RegistrationComponent,
    PickupComponent,
    DeliveryComponent,
    TrackComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
