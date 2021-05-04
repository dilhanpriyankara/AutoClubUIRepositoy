import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import {observable, Observable, Subscriber, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//import { Socket } from 'ngx-socket-io';
import io from 'socket.io-client'; 

@Injectable({
  providedIn: 'root'
})
export class AutoclubDataDownloadService {

  endpoint = 'http://localhost:3200';
  socketurl = 'http://localhost:3200/websocketpath';
  socket: any;
  constructor(private httpClient: HttpClient,
              /*private socket: Socket*/) { 
                console.log("connectionTowebSocket====>>>");
                this.socket=io(this.socketurl, { transports: ['websocket'], timeout: 60000 });
                          
                this.socket.once('connect', () => {
                  console.log('progress-listener connected');
                  this.socket.emit("progress-listener-ready",{name:"socketOK"});
                });
                this.socket.once('disconnect', () => {
                  console.log('progress-listener disconnected');
                });
              }  
 
              

  getDownloadCsv(carage: number): Observable<any> {
   
    return this.httpClient.get<any>(this.endpoint +'/exporttocsv/'+carage)
   
    
  }

  receiveMassage():Observable<any>{   
    return new Observable((subscriber)=>{
      this.socket.on('csvcompleted',(data)=>{        
        subscriber.next(data);
    })
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
