import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {FormData} from "../update-form-dialog/formData";
export class AutoclubData {
  id: number;
  firstName: string;
  lastName: string;
  phone: number;
  email:string;
  carModel:String;
  carMake:String;
  ageOfVehicle:number;
  manufacturedDate:String;
}


@Injectable({
  providedIn: 'root'
})
export class CRUDService {


  // REST API
  endpoint = 'http://localhost:3200';

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
   
  getUsers(): Observable<AutoclubData> {
    return this.httpClient.get<AutoclubData>(this.endpoint + '/dashboarddata')
    .pipe(
      retry(1),
      catchError(this.processError)
    )
    
  }
  

  remove(id: number):Observable<any>{   
    return this.httpClient.delete<any>(this.endpoint + '/dashboarddata/'+id)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  update(object: FormData):Observable<any>{   
   
    return this.httpClient.put<any>(this.endpoint + '/dashboarddata/' + object.id, JSON.stringify(object), this.httpHeader)
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
