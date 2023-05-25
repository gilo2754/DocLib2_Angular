import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { SpecialityFromServer } from '../../speciality/speciality-interface';
import { API_ADMIN_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private http: HttpClient) { }

  getSpecialities(): Observable<string[]> {
    return this.http.get<string[]>(`${API_ADMIN_URL}/specialities`);
  }

}
