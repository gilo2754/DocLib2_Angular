import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public clinic_description: string,
    public clinic_phone_number: string,
    public clinic_state: string
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  id:number
  todos: Todo[]
  message: string

  constructor(
    private todoService:TodoDataService,
    private router : Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('in28minutes').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id) {
    //TODO: add verification before deleting
    console.log(`delete todo ${id}`)
    this.todoService.deleteTodo(id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of Clinic ${id} Successful!`;
        this.refreshTodos();
      },
      error => {
        console.log(error);
        this.message = error.error;
      }
    )
  }

  updateTodo(id) {
    console.log(`update ${id}`)
    this.router.navigate(['clinic',id])
  }

  addTodo() {
    console.log(`New clinic is going to be created`)
    this.router.navigate(['clinic', '-1'])
  }
}
