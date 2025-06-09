// src/app/pages/ms-pages/gps/gps.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate que esté aquí
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms'; // Si lo necesitas para ManageComponent

import { GpsRoutingModule } from './gps-routing.module';
import { MapaGpsComponent } from './mapa-gps/mapa-gps.component';
import { GpsLocationViewComponent } from './gps-location-view/gps-location-view.component';
import { ListGpsComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component'; // Si tienes este componente aquí

@NgModule({
  declarations: [
    MapaGpsComponent,
    GpsLocationViewComponent,
    ListGpsComponent,
    ManageComponent // Asegúrate de que ManageComponent esté declarado aquí
  ],
  imports: [
    CommonModule,
    GpsRoutingModule,
    HttpClientModule, // Añádelo si no está
    GoogleMapsModule,
    FormsModule // Añádelo si no está
  ]
})
export class GpsModule { }