import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AutoclubDataDownloadService } from './autoclub-data-download.service';
@Component({
  selector: 'app-autoclub-data-download',
  templateUrl: './autoclub-data-download.component.html',
  styleUrls: ['./autoclub-data-download.component.css']
})
export class AutoclubDataDownloadComponent implements OnInit {
  

  constructor(private autoclubDataDownloadService:AutoclubDataDownloadService) { }

  ngOnInit(): void {
  }

  options: string[] = ["10", "15", "20","25", "30", "35","40"];
  selectedQuantity = "10";

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value.selectedQuantity);
    this.autoclubDataDownloadService.getDownloadCsv(form.value.selectedQuantity).subscribe((result)=>{
      console.log(result);
    });
  }

  

}
