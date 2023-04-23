import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../list-todos/list-todos.component';

const OBJECT ='clinic';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number
  todo: Todo

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    
    this.todo = new Todo(this.id,'New clinic','1234','IN_REVIEW');
    
    if(this.id!=-1) {
      this.todoService.retrieveTodo(this.id)
          .subscribe (
            data => this.todo = data
          )
    }
  }

  saveTodo() {
    // Compare same data types 
    if(Number(this.id) === -1) {
    // Taking the id out, because this will auto. generated
      const createdTodo = this.todo;
      delete createdTodo.id;
     this.todoService.createTodo(createdTodo)
          .subscribe (
            data => {
              console.log(data)
              console.log("CREATING")

              this.router.navigate([OBJECT, 'add'])
            }
          )
    } else {
      this.todoService.updateTodo(this.id, this.todo)
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
