import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificPremisesRoutingModule } from './specific-premises-routing.module';
import { HomeAndCarsComponent } from './home-and-cars/home-and-cars.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { SpecificPremisesMasterComponent } from './specific-premises-master/specific-premises-master.component';
import { LivingRoomComponent } from './living-room/living-room.component';


@NgModule({
  declarations: [
    HomeAndCarsComponent,
    ApartmentsComponent,
    SpecificPremisesMasterComponent,
    LivingRoomComponent
  ],
  imports: [
    CommonModule,
    SpecificPremisesRoutingModule
  ]
})
export class SpecificPremisesModule { }
