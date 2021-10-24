import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DateService} from "./date.service";

export interface Task {
  _id?:string
  taskId: string
  title: string
  date: Date
  completed?: boolean
  description?: string
  status?: number
  deadline?: Date
  order?: number
  addedDate?: Date
}

@Injectable({providedIn: 'root'})//чтоб не регить в моделе

export class TodoListsService {
  static url = 'http://localhost:5100/Todolist'
  public taskList: BehaviorSubject<Task[]> = new BehaviorSubject<any>([])

  constructor(private http: HttpClient,
              private dateService: DateService) {
  }

  getTask(task: Task) {
    // return this.http.get(`${TodoListsService.url}/${task.taskId}/getTasks`)
    return this.http.get(`${TodoListsService.url}/${task.date}/getTasks`)
  }

  // load(date: moment.Moment): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${TodoListsService.url}/${date.format('DD-MM-YYYY')}.json`)
  //     .pipe(map(tasks => {
  //       if (!tasks) {
  //         return []
  //       }
  //       return Object.keys(tasks).map(key => ({...tasks[key], id: key}))
  //     }))
  // }

  getTaskList(date: any) {
    //date=month&year
    this.http.get(`${TodoListsService.url}/${date}/getTasks`).subscribe(
      (res: any) => {
        console.log('res getTaskList',res);
        this.taskList.next(res.allTasks)
      }
    )
  }

  removeTask(tId: string) {
    return this.http.delete(`${TodoListsService.url}/${tId}/removeTask`)
  }

  create(task: Task) {
    // return this.http.post(`${TodoListsService.url}/${task.date}`,task)
    return this.http.post(`${TodoListsService.url}/${task.taskId}/addTask`, task)
  }
  update(task: Task) {
    return this.http.put(`${TodoListsService.url}/${task._id}/updateTask`, task)
  }
}
