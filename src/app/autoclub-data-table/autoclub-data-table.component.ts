import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import {CRUDService} from "../autoclub-data-table/crud.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { UpdateFormDialogComponent } from "../update-form-dialog/update-form-dialog.component";
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';




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
      return this.apollo.watchQuery({query : gql`
                query{
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
                `

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
    
    let pagesize=e.pageSize-100;
    
    return this.apollo.watchQuery({query : gql`
                        query{
                          findPeginationData(pagesize:${pagesize}){    
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
    `

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
         this.apollo.mutate({mutation:gql`
                            mutation  {
                              deletedata(recordid:${id}){
                                id            
                              }
                            }
                            
                            `
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
        console.log(result);
        if (result) {          
          this.apollo.mutate({mutation:gql`
          mutation  {
            updatedata(UpdatedataInputType: {
                id: ${result.id}, 
                firstName: "${result.firstName}", 
                lastName: "${result.lastName}",       
                email: "${result.email}",
                carModel: "${result.carModel}", 
                carMake: "${result.carMake}", 
                ageOfVehicle: ${result.ageOfVehicle}, 
                manufacturedDate: "${result.manufacturedDate}"
                }) {
              id
              firstName
              lastName
             
            }
          }
          
          `
        }).subscribe((result)=>{

          console.log("sucessfully updated"+result);


        })
        }
      });
    }
   
    // fetchData1(){  //This is called to rest endpoint
     
    //      this.crudService.getUsers().subscribe((res: {}) => {
    //      var jsonstring= JSON.stringify(res);
    //      const obj = JSON.parse(jsonstring);
    //      console.log(JSON.stringify(obj.data.allAutoclubdata.nodes));
    //      var data1=JSON.stringify(obj.data.allAutoclubdata.nodes);        
    //      this.dataSource = obj.data.allAutoclubdata.nodes;
        
    //     })      
    // }
    
     // delete1(id: any) {
    //     const dialogRef = this.dialog.open(ConfirmationDialogComponent);  
    //     dialogRef.afterClosed().subscribe(result => {
    //       if (result) {
    //         console.log(result);
    //       this.crudService.remove(id).subscribe(res=>{
    //         console.log(res);            
    //         }); 
    //       }
    //     });
    // }


    // public handlePage(e: any) {   
    //   console.log(e.pageSize-100);
    //    this.crudService.getPaginationData(e.pageSize-100).subscribe((res: {}) => {
    //     var jsonstring= JSON.stringify(res);
    //     const obj = JSON.parse(jsonstring);
    //     console.log(JSON.stringify(obj.data.allAutoclubdata.nodes));    
    //     this.dataSource = obj.data.allAutoclubdata.nodes;       
    //   })      
      
      
    // }
  
 }


  