// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
//
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { CalendarBodyComponent } from './calendar-body/calendar-body.component';
// import { OrganizerComponent } from './organizer/organizer.component';
// import { HeaderComponent } from './header/header.component';
// import {MomentPipe} from "./shared/moment.pipe";
// import {DateService} from "./shared/date.service";
//
// @NgModule({
//   declarations: [
//     AppComponent,
//     CalendarBodyComponent,
//     OrganizerComponent,
//     HeaderComponent,
//     MomentPipe
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [
//     DateService
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {OrganizerComponent} from './organizer/organizer.component';
import {MomentPipe} from './shared/moment.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from "./header/header.component";
import {CalendarBodyComponent} from "./calendar-body/calendar-body.component";
import {CustomDatePipe} from "./shared/custom.datepipe";

@NgModule({
  declarations: [
    AppComponent,
    CalendarBodyComponent,
    HeaderComponent,
    OrganizerComponent,
    MomentPipe,
    CustomDatePipe,
    CustomDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
