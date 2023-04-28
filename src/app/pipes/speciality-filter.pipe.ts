import { Pipe, PipeTransform } from '@angular/core';
import { Clinic } from '../list-clinics/list-clinics.component';

@Pipe({
  name: 'specialityFilter'
})
export class FilterPipe implements PipeTransform {
  transform(clinics: Clinic[], speciality: string): Clinic[] {
    if (!speciality) {
      return clinics;
    }
    return clinics.filter(clinic => clinic.speciality === speciality);
  }
}
