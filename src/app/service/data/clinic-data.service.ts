import { API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clinic } from '../../list-clinics/list-clinics.component';

const OBJECT ='clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllClinics(username) {
    return this.http.get<Clinic[]>(`${API_URL}/${OBJECT}s`);
    //console.log("Execute Hello World Bean Service")
  }

  // deleteTodo(username, id){
  deleteClinic(id){
    return this.http.delete(`${API_URL}/${OBJECT}/${id}`);
  }

  //retrieveTodo(username, id){
    retrieveClinic(id){ 
  //return this.http.get<Todo>(`${API_URL}/users/${username}/todos/${id}`);
      return this.http.get<Clinic>(`${API_URL}/${OBJECT}/${id}`);
  }

//  updateTodo(username, id, todo){
  updateClinic(id, clinic ){
    console.log(`update ${id}`)
return this.http.put(
//          `${API_URL}/users/${username}/todos/${id}`
`${API_URL}/${OBJECT}/${id}`  
, clinic );
  }

//  createTodo(username, todo){
    createClinic(clinic){
      console.log(`Clinic created`)
      console.log(clinic)
    return this.http.post(
             // `${API_URL}/users/${username}/todos`
             `${API_URL}/clinic/add`
                , clinic);
  }

}
