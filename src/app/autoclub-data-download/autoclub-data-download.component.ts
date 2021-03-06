import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { AutoclubDataDownloadService } from './autoclub-data-download.service';
import gql from 'graphql-tag';

const DOWNLOADDATA_QUERY=gql`query($ageofcar:Int!){
                              exportDatatoCSV(ageofcar:$ageofcar){    
                                id
                                firstName
                                lastName
                                email
                                carModel
                                carMake
                                ageOfVehicle
                                manufacturedDate
                              }
                            }
                            `;

@Component({
  selector: 'app-autoclub-data-download',
  templateUrl: './autoclub-data-download.component.html',
  styleUrls: ['./autoclub-data-download.component.css']
})
export class AutoclubDataDownloadComponent implements OnInit {
  
  constructor(private autoclubDataDownloadService:AutoclubDataDownloadService,
    private apollo: Apollo,  ) { }

  @ViewChild('alert', { static: true }) alert: ElementRef;

  messageNotific;
  ishide=false;;
  ngOnInit(): void {
   /* this.autoclubDataDownloadService.receiveMassage().subscribe((data)=>{
      console.log(data);
      this.messageNotific=data;
      this.ishide=true;

      setTimeout(() => {
        this.closeAlert()
      }, 2000);
      
    })*/
  }



  options: string[] = ["10", "15", "20","25", "30", "35","40"];
  selectedQuantity = "10";

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value.selectedQuantity);
   
    /*Socket cluster Listning*/
    this.autoclubDataDownloadService.receiveMassage().subscribe((data)=>{
      console.log(data);
      this.messageNotific=data;
      this.ishide=true;

      setTimeout(() => {
        this.closeAlert()
      }, 2000);
      
    })
    /*End Socket cluster Listning*/
   
    return this.apollo.watchQuery({query :DOWNLOADDATA_QUERY,
                                    variables:{"ageofcar":parseInt(form.value.selectedQuantity)}

    }).valueChanges.subscribe(({ data }: any) => {
     //console.log(data);   
    }) 

    //});   
   
   
  }


  closeAlert() {
    this.ishide=false;
  }

  

}
