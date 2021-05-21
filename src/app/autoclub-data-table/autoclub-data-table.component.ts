import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import {CRUDService} from "../autoclub-data-table/crud.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { UpdateFormDialogComponent } from "../update-form-dialog/update-form-dialog.component";
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const PAGINATION_QUERY=gql`query($pagesize:Int!){
                            findPeginationData(pagesize:$pagesize){    
                              id
                              firstName
                              lastName
                              email
                              carModel
                              carMake
                              ageOfVehicle
                              manufacturedDate
                            }
                          }`;

const SELECT_ALLQUERY= gql`query{
                          findAllData{
                          id
                            lastName
                            firstName
                            email
                            carModel
                            carMake
                            ageOfVehicle
                            manufacturedDate
                          }
                        }      
                        `;
const DELETE_QUERY=gql`mutation ($recordid:Int!){
                        deletedata(recordid:$recordid){
                          id            
                        }
                      }
                      `;

const UPDATE_QUERY=gql`mutation ($input:UpdatedataInputType!) {
                       updatedata(UpdatedataInputType: $input) {
                        id
                        firstName
                        lastName
                      
                      }
                    }`;

  @Component({
    selector: 'app-autoclub-data-table',
    templateUrl: './autoclub-data-table.component.html',
    styleUrls: ['./autoclub-data-table.component.css']
  })
  export class AutoclubDataTableComponent {
   
    constructor(public crudService: CRUDService,
                public dialog: MatDialog,
                private apollo: Apollo,  
                ) { }
  
    
  
    ngOnInit(): void {
        this.fetchData();      
    }
      
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','phone','carModel','carMake','ageOfVehicle','manufacturedDate','actions'];    
    dataSource=[]; 
    

    fetchData(){ 
      return this.apollo.watchQuery({query :SELECT_ALLQUERY
    }).valueChanges.subscribe(({ data }: any) => {      
      //console.log(data.findAllData);
        this.dataSource =data.findAllData;
      })
    }    

    wildcardFilterChar(filterValue: string) {    
      if (filterValue == '') {          
          this.fetchData();
      }
      else if (filterValue != '') {
          this.dataSource = this.dataSource.filter(e =>
              e.firstName.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
              e.lastName.toLowerCase().includes(filterValue.trim().toLowerCase()) 
                  
        );
      }
    }

    public handlePage(e: any) {    
      let pagesize=(e.pageIndex*100);
      console.log(pagesize);
      return this.apollo.watchQuery({query :PAGINATION_QUERY,
                                    variables:{"pagesize":pagesize}
      }).valueChanges.subscribe(({ data }: any) => {

          console.log(data.findPeginationData);
          this.dataSource =data.findPeginationData;
      }) 
      
    }

    delete(id: any) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          //console.log(result);
          this.apollo.mutate({mutation:DELETE_QUERY,
                              variables:{"recordid":id}
          }).subscribe((result)=>{          
            console.log("sucessfully deleted"+result.data);
          })
        }
      });
    }


    edit(data: any) {
      console.log(data);
      const dialogRef = this.dialog.open(UpdateFormDialogComponent, {
        width: '400px',
        data: data
      });
      
      dialogRef.afterClosed().subscribe(result => {
        
        if (result) {          
          this.apollo.mutate({mutation:UPDATE_QUERY,
            variables: {"input":{
              "id": result.id, 
              "firstName": result.firstName, 
              "lastName": result.lastName,       
              "email": result.email,
              "carModel": result.carModel, 
              "carMake": result.carMake, 
              "ageOfVehicle": parseInt(result.ageOfVehicle), 
              "manufacturedDate":result.manufacturedDate
        }
        }
        }).subscribe((result)=>{

          console.log("sucessfully updated"+result);


        })
        }
      });
    } 
    
 }


  