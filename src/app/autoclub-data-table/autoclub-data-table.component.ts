import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import {CRUDService} from "../autoclub-data-table/crud.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { UpdateFormDialogComponent } from "../update-form-dialog/update-form-dialog.component";





  @Component({
    selector: 'app-autoclub-data-table',
    templateUrl: './autoclub-data-table.component.html',
    styleUrls: ['./autoclub-data-table.component.css']
  })
  export class AutoclubDataTableComponent {
   
    constructor(public crudService: CRUDService, public dialog: MatDialog) { }
  
    
  
  ngOnInit(): void {
      this.fetchData();
      
  }
    
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','phone','carModel','carMake','ageOfVehicle','manufacturedDate','actions'];    
    dataSource: any 
    
  
     
    fetchData(){  
     
         this.crudService.getUsers().subscribe((res: {}) => {
         var jsonstring= JSON.stringify(res);
         const obj = JSON.parse(jsonstring);
         console.log(JSON.stringify(obj.data.allAutoclubdata.nodes));
         var data1=JSON.stringify(obj.data.allAutoclubdata.nodes);        
         this.dataSource = obj.data.allAutoclubdata.nodes;
        
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
    console.log(e.pageSize-100);
    this.crudService.getPaginationData(e.pageSize-100).subscribe((res: {}) => {
      var jsonstring= JSON.stringify(res);
      const obj = JSON.parse(jsonstring);
      console.log(JSON.stringify(obj.data.allAutoclubdata.nodes));    
      this.dataSource = obj.data.allAutoclubdata.nodes;
     
    })      
    
  }

    delete(id: any) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);  
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log(result);
          this.crudService.remove(id).subscribe(res=>{
            console.log(res);            
            }); 
          }
        });
    }


    edit(data: any) {
      const dialogRef = this.dialog.open(UpdateFormDialogComponent, {
        width: '400px',
        data: data
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {          
          this.crudService.update(result).subscribe(res=>{
            console.log(res); 
          });
        }
      });
    }
   

    
    
 }


  