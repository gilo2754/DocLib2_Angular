import { WelcomeDataService } from './../service/data/welcome-data.service';
import { ActivatedRoute } from '@angular/router';
import { Specialities } from '../enums/specialities.enum';
import { Municipalities } from '../enums/municipies.enum';
import { ClinicDataService } from '../service/data/clinic-data.service';
//import { speciality } from '../speciality/speciality-interface';
import { SpecialityService } from '../service/data/speciality-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  message = 'Some Welcome Message'
  welcomeMessageFromService:string
  name = ''
  municipalities = Object.values(Municipalities);
  specialities= Object.values(this.getSpecialities() || Specialities);

  constructor(
    private route:ActivatedRoute,
    private service:WelcomeDataService,
    private clinicService:ClinicDataService,
    private specialityService: SpecialityService,
) { 
  }

  // void init() {
  ngOnInit(){
    //COMPILATION ERROR this.message = 5
    //console.log(this.message)
    // console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name'];
    this.getSpecialities();
    console.log(this.getSpecialities());

  }
  getSpecialities(): string[] {
    this.specialityService.getSpecialities()
      .subscribe(specialities => this.specialities = specialities);
      return this.specialities;

  }

filteredSpecialities: string[] = this.specialities.slice();
filteredMunicipalities: string[] = this.municipalities.slice();

searchClinicsBySpeciality(speciality: string) {
  this.clinicService.getClinicsBySpeciality(speciality).subscribe(
    response => {
      // do something with the retrieved clinics
      console.log(response);
    },
    error => {
      // handle error
      console.log(error);
    }
  );
}

  onInputChange(text: string, field: string) {
    const lowerText = text.toLowerCase();
    if (field === 'speciality') {
      this.filteredSpecialities = this.specialities.reduce((acc, curr) => {
        if (curr.toLowerCase().includes(lowerText)) {
          acc.push(curr);
        }
        return acc;
      }, []);
    } else if (field === 'municipality') {
      this.filteredMunicipalities = this.municipalities.reduce((acc, curr) => {
        if (curr.toLowerCase().includes(lowerText)) {
          acc.push(curr);
        }
        return acc;
      }, []);
    }
  }
  

  onSpecialityClick(speciality: string) {
    (document.getElementById('speciality') as HTMLInputElement).value = speciality;
    this.filteredSpecialities = [];
  }

  onMunicipalityClick(municipality: string) {
    (document.getElementById('municipality') as HTMLInputElement).value = municipality;
    this.filteredMunicipalities = [];
  }
  

  onSubmit(event: Event) {
    event.preventDefault();

    const speciality = (event.target as HTMLFormElement).speciality.value;
    const municipality = (event.target as HTMLFormElement).municipality.value;
  }

  getWelcomeMessage() {  
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    
  }

  getWelcomeMessageWithParameter() {  
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    
    //console.log('last line of getWelcomeMessage')

    //console.log("get welcome message");
  }


  handleSuccessfulResponse(response){
    this.welcomeMessageFromService = response.message
    //console.log(response);
    //console.log(response.message);
  }

  handleErrorResponse(error) {
    //console.log(error);
    //console.log(error.error);
    //console.log(error.error.message);
    this.welcomeMessageFromService = error.error.message
  }
}

