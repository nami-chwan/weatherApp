import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    IonicModule
  ]
})
export class SharedModule { }
