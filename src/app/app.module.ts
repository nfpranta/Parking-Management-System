import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParkingFormComponent } from './parking-form/parking-form.component';
import { ParkingTableComponent } from './parking-table/parking-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, ParkingTableComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ParkingFormComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
