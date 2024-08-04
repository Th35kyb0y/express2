import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAndCarsComponent } from './home-and-cars/home-and-cars.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { LivingRoomComponent } from './living-room/living-room.component';

const routes: Routes = [
  {path:'', component:HomeAndCarsComponent},
  {path:'apartments', component:ApartmentsComponent},
  {path:'livingRoom', component:LivingRoomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificPremisesRoutingModule { }
