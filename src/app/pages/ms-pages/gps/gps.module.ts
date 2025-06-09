// src/app/pages/ms-pages/gps/gps.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'; // ✅ Agregar este import
import { GpsRoutingModule } from './gps-routing.module';
import { ListGpsComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { MapaGpsComponent } from './mapa-gps/mapa-gps.component';
import { GpsLocationViewComponent } from './gps-location-view/gps-location-view.component';

@NgModule({
  declarations: [
    ListGpsComponent,
    ManageComponent,
    MapaGpsComponent,
    GpsLocationViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule, // ✅ Agregar GoogleMapsModule aquí
    GpsRoutingModule
  ]
})
export class GpsModule { }