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
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateFormDialogComponent } from './update-form-dialog/update-form-dialog.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    AutoclubDataTableComponent,
    AutoclubDataUploadComponent,
    ConfirmationDialogComponent,
    UpdateFormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,

    ReactiveFormsModule,
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,   
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,  
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      {path: 'autoclub-data-table', component: AutoclubDataTableComponent},
      {path: 'autoclub-data-upload', component: AutoclubDataUploadComponent},
     // {path: '', redirectTo: '/heroes-list', pathMatch: 'full'}
      
    ]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
