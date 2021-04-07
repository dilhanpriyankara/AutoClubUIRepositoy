import { Component, OnInit } from '@angular/core';
import {CRUDService} from "../autoclub-data-table/crud.service";

//  export interface PeriodicElement {
//    id: number;
//    firstName: number;
//    lastName: number;
//    email: string;
//  }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

// @Component({
//   selector: 'app-autoclub-data-table',
//   templateUrl: './autoclub-data-table.component.html',
//   styleUrls: ['./autoclub-data-table.component.css']
// })
// export class AutoclubDataTableComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = ELEMENT_DATA;
// }


  @Component({
    selector: 'app-autoclub-data-table',
    templateUrl: './autoclub-data-table.component.html',
    styleUrls: ['./autoclub-data-table.component.css']
  })
  export class AutoclubDataTableComponent implements OnInit {
   
    constructor(public crudService: CRUDService) { }
  
    
  
  ngOnInit(): void {
      this.fetchData();
      
  }
    
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','phone','carModel','carMake','ageOfVehicle','manufacturedDate'];    
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
   


    
    
 }
  