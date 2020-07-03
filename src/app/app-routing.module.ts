import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './component/registration/registration.component'
import {PickupComponent} from './component/pickup/pickup.component'
import {DeliveryComponent} from './component/delivery/delivery.component'
import {TrackComponent} from './component/track/track.component'
import {LoginComponent} from './component/login/login.component'


const routes: Routes = [
  {
    path:'', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path:'registration', component: RegistrationComponent
  },
  {
    path:'pickup', component: PickupComponent
  },
  {
    path:'delivery', component: DeliveryComponent
  },
  {
    path:'track', component: TrackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
