import { ClinicDataService } from '../service/data/clinic-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const OBJECT ='clinic';

export class Clinic {
  constructor(
    public id: number,
    public clinic_description: string,
    public clinic_phone_number: string,
    public clinic_state: string
  ){

  }
}

@Component({
  selector: 'app-list-clinics',
  templateUrl: './list-clinics.component.html',
  styleUrls: ['./list-clinics.component.css']
})
export class ListClinicsComponent implements OnInit {
  id:number
  clinics: Clinic[]
  message: string

  constructor(
    private clinicService:ClinicDataService,
    private router : Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.refreshClinics();
  }

  refreshClinics(){
    this.clinicService.retrieveAllClinics('in28minutes').subscribe(
      response => {
        console.log(response);
        this.clinics = response;
      }
    )
  }

  deleteClinic(id) {
    //TODO: add verification before deleting
    console.log(`delete ${OBJECT} ${id}`)
    this.clinicService.deleteClinic(id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of ${OBJECT} ${id} Successful!`;
        this.refreshClinics();
      },
      error => {
        console.log(error);
        this.message = error.error;
      }
    )
  }

  updateClinic(id) {
    console.log(`update ${id}`)
    this.router.navigate(['clinic',id])
  }

  addClinic() {
    console.log(`New ${OBJECT} is going to be created`)
    this.router.navigate(['clinic', '-1'])
  }
}
