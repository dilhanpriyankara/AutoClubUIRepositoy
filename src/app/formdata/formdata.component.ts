import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CRUDService } from '../autoclub-data-table/crud.service';
@Component({
  selector: 'app-formdata',
  templateUrl: './formdata.component.html',
  styleUrls: ['./formdata.component.css']
})
export class FormdataComponent implements OnInit {

  constructor(public crudService: CRUDService,    
    private apollo: Apollo,  
    ) { }

  ngOnInit(): void {
    this.fetchData()
  }

  name="Dilhan";

  dataList=[{"name":"dilhan","age":"20","address":"col","school":"jvc","country":"Lk"},
  {"name":"dilhan","age":"20","address":"col","school":"jvc","country":"Lk"},
  {"name":"dilhan","age":"20","address":"col","school":"jvc","country":"Lk"},
  {"name":"dilhan","age":"20","address":"col","school":"jvc","country":"Lk"},
  {"name":"dilhan","age":"20","address":"col","school":"jvc","country":"Lk"},
  {"name":"dilhan","age":"20","address":"col","school":"jvc","country":"Lk"},
  {"name":"dilhan","age":"20","address":"col","school":"jvc","country":"Lk"},
  {"name":"dilhan","age":"20","address":"col","school":"jvc","country":"Lk"},
  {"name":"dilhan","age":"20","address":"col","school":"jvc","country":"Lk"}
            ]

 

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
      this.dataList =data.findAllData;
    })      

  } 
}
