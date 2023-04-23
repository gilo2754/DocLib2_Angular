import { ActivatedRoute, Router } from '@angular/router';
import { ClinicDataService } from '../service/data/clinic-data.service';
import { Component, OnInit } from '@angular/core';
import { Clinic } from '../list-clinics/list-clinics.component';

const OBJECT ='clinic';

@Component({
  selector: 'app-clinic ',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  id:number
  clinic: Clinic

  constructor(
    private clinicService: ClinicDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    
    this.clinic = new Clinic(this.id,'New clinic','1234','IN_REVIEW');
    
    if(this.id!=-1) {
      this.clinicService.retrieveClinic(this.id)
          .subscribe (
            data => this.clinic = data
          )
    }
  }

  saveClinic() {
    // Compare same data types 
    if(Number(this.id) === -1) {
    // Taking the id out, because this will auto. generated
      const createdClinic = this.clinic;
      delete createdClinic.id;
     this.clinicService.createClinic(createdClinic)
          .subscribe (
            data => {
              console.log(data)
              console.log("CREATING")
              this.router.navigate([OBJECT.concat('s')])
            }
          )
    } else {
      this.clinicService.updateClinic(this.id, this.clinic)
          .subscribe (
            data => {
              console.log("UPDATING")
              console.log(data)
              this.router.navigate([OBJECT.concat('s')]);//,this.id])
            }
          )
    }
}

}
