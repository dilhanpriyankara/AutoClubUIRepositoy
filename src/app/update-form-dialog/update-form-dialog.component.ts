import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormData} from "../update-form-dialog/formData";
@Component({
  selector: 'app-update-form-dialog',
  templateUrl: './update-form-dialog.component.html',
  styleUrls: ['./update-form-dialog.component.css']
})
export class UpdateFormDialogComponent implements OnInit {
  formInstance: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData) {
    this.formInstance = new FormGroup({
      "id":  new FormControl('', Validators.required),
      "firstName": new FormControl('', Validators.required),
      "lastName": new FormControl('', Validators.required),
      "email":new FormControl('', Validators.required),
      "carModel":new FormControl('', Validators.required),
      "carMake":new FormControl('', Validators.required),
      "ageOfVehicle":new FormControl('', Validators.required), 
      "manufacturedDate":new FormControl('', Validators.required), 
      "__typename":new FormControl('', Validators.required), 
      
    });

    this.formInstance.setValue(data);
  }

  

  ngOnInit(): void {
  }


  save(): void {
    this.dialogRef.close(Object.assign(new FormData(), this.formInstance.value));
  }

}
