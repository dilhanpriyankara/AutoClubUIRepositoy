import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutoclubDataDownloadService {

  endpoint = 'http://localhost:3200';
  constructor(private httpClient: HttpClient) { }



  getDownloadCsv(carage: number): Observable<any> {
   
    return this.httpClient.get<any>(this.endpoint +'/exporttocsv/'+carage)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
    
  }

  processError(err: { error: { message: string; }; status: any; message: any; }) {
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
