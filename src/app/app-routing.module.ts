import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './component/registration/registration.component'
import {PickupComponent} from './component/pickup/pickup.component'
import {DeliveryComponent} from './component/delivery/delivery.component'
import {TrackComponent} from './component/track/track.component'
import {LoginComponent} from './component/login/login.component'
import { AuthGuard } from './guard/auth.guard';


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
    path:'pickup', component: PickupComponent, canActivate:[AuthGuard]
  },
  {
    path:'delivery', component: DeliveryComponent, canActivate:[AuthGuard]
  },
  {
    path:'track', component: TrackComponent, canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
