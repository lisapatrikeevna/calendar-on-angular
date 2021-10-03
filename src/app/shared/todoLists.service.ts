import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface Task{
  taskId:string
  title:string
  date:Date
}

@Injectable({providedIn:'root'})//чтоб не регить в моделе

export class TodoListsService {
  static url = 'http://localhost:5100/Todolist'

  constructor(private http: HttpClient) {}

  create(task:Task){
    // return this.http.post(`${TodoListsService.url}/${task.date}`,task)
    return this.http.post(`${TodoListsService.url}/${task.taskId}/addTask`,task)
  }
}
