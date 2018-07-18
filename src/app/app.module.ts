import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutesModule } from './routes.module';

import { AppComponent } from './app.component';
import { MetaModule } from './meta/meta.module';
import { CommonModule } from '@angular/common';

// components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';

// services
import { UportService } from './services/uport/uport.service';
import { Web3Service } from './services/web3/web3.service';

@NgModule({
  declarations: [AppComponent, DashboardComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MetaModule,
    RoutesModule,
  ],
  providers: [Web3Service, UportService],
  bootstrap: [AppComponent],
})
export class AppModule {}
