import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService { 


  // REST API
  endpoint = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

 
   
 uploaddata(): Observable<any> {
    return this.httpClient.get<any>(this.endpoint + '/csvreader')
    .pipe(
      retry(1),
      catchError(this.processError)
    )
    
  }

  processError(err) {
    let message = '';
    if(err.error instanceof ErrorEvent) {
     message = err.error.message;
    } else {
     message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
 }
}
