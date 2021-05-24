import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import {observable, Observable, Subscriber, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//import { Socket } from 'ngx-socket-io';
//import io from 'socket.io-client'; 

import * as socketCluster from 'socketcluster-client';

@Injectable({
  providedIn: 'root'
})
export class AutoclubDataDownloadService {

  endpoint = 'http://localhost:3200'; 
  socket = socketCluster.create({
    hostname: "localhost",
    port: 8000,
  });
  constructor(private httpClient: HttpClient) { 
              }  
 
              

  getDownloadCsv(carage: number): Observable<any> {
   
    return this.httpClient.get<any>(this.endpoint +'/exporttocsv/'+carage)
   
    
  }

  receiveMassage():Observable<any>{
 
    return new Observable((subscriber)=>{ 
      (async () => {                
        let chanelkey=Math.random().toString(36).substr(2, 5);
        let channel = this.socket.subscribe(chanelkey);
      
        //send data to the  server
        this.socket.transmit("channelName", chanelkey);
    
        //data received from server
        for await (let data of channel) {
          // ... Handle channel data.       
          subscriber.next(data);  
        }  
        
      })();
        
    })
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
