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

 fileupload(files: FileList){
  if (files && files.length > 0) {
    let file: File = files.item(0);
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = ev => {
      let csvdata = fileReader.result.toString();
      let body = {data:csvdata};      
      this.uploadServiceService.readUploadData(body).subscribe((res)=>{
        console.log(res);
      })
      
    };
  }
 }
}
