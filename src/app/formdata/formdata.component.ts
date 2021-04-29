import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formdata',
  templateUrl: './formdata.component.html',
  styleUrls: ['./formdata.component.css']
})
export class FormdataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
}
