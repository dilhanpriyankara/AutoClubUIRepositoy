
 export class FormData{
    id?: number;
    firstName: string;
    lastName: string;
    email:string;
    carModel:string;
    carMake:string;
    ageOfVehicle:number;
    manufacturedDate:string;
    
    
    constructor(id: number = null, 
                firstName: string = '', lastName: string = '',email:string='',carModel:string='',carMake:string='',ageOfVehicle:number=null,manufacturedDate:string='') {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email=email;
      this.carModel=carModel;
      this.carMake=carMake;
      this.ageOfVehicle=ageOfVehicle;
      this.manufacturedDate=manufacturedDate;
      
    }
 }
