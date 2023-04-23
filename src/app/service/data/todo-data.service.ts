import { API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../../list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllTodos(username) {
    return this.http.get<Todo[]>(`${API_URL}/clinics`);
    //console.log("Execute Hello World Bean Service")
  }

  // deleteTodo(username, id){
  deleteTodo(id){
    return this.http.delete(`${API_URL}/clinic/${id}`);
  }

  //retrieveTodo(username, id){
    retrieveTodo(id){ 
  //return this.http.get<Todo>(`${API_URL}/users/${username}/todos/${id}`);
      return this.http.get<Todo>(`${API_URL}/clinic/${id}`);
  }

//  updateTodo(username, id, todo){
  updateTodo(id, todo){
    console.log(`update ${id}`)
return this.http.put(
//          `${API_URL}/users/${username}/todos/${id}`
`${API_URL}/clinic/${id}`  
, todo);
  }

//  createTodo(username, todo){
    createTodo(todo){
      console.log(`Clinic created`)
      console.log(todo)
    return this.http.post(
             // `${API_URL}/users/${username}/todos`
             `${API_URL}/clinic/add`
                , todo);
  }

}
