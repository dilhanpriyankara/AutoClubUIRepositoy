import { Component, OnInit } from '@angular/core';
import { UploadServiceService } from "../autoclub-data-upload/upload-service.service";
@Component({
  selector: 'app-autoclub-data-upload',
  templateUrl: './autoclub-data-upload.component.html',
  styleUrls: ['./autoclub-data-upload.component.css']
})
export class AutoclubDataUploadComponent implements OnInit {

  constructor(public uploadServiceService: UploadServiceService) { }

  ngOnInit(): void {
  }
  itemclick() {
   

    this.uploadServiceService.uploaddata().subscribe((res) => {
      console.log("ok clicked");
      console.log(res);
     
     })      
 }
}
