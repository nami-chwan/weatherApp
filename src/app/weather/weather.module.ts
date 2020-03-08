import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: "weather", component: WeatherComponent
  },
]

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ]
})
export class WeatherModule { }
