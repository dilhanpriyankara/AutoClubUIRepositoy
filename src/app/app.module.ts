import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoclubDataTableComponent } from './autoclub-data-table/autoclub-data-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AutoclubDataUploadComponent } from './autoclub-data-upload/autoclub-data-upload.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AutoclubDataTableComponent,
    AutoclubDataUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    RouterModule.forRoot([
      {path: 'autoclub-data-table', component: AutoclubDataTableComponent},
      {path: 'autoclub-data-upload', component: AutoclubDataUploadComponent},
     // {path: '', redirectTo: '/heroes-list', pathMatch: 'full'}
      
    ]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
