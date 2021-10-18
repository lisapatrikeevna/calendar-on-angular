import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DateService} from "./date.service";

export interface Task {
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
  public taskList: BehaviorSubject<any> = new BehaviorSubject<any>([])

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
        this.taskList.next(res.allTasks)
      }
    )
  }

  removeTask(tId: string,date:string) {
    console.log('removeTask s',tId);
    this.http.delete(`${TodoListsService.url}/tId/removeTask`)
    this.getTaskList(this.dateService.dateFormat(date))
  }

  create(task: Task) {
    // return this.http.post(`${TodoListsService.url}/${task.date}`,task)
    return this.http.post(`${TodoListsService.url}/${task.taskId}/addTask`, task)
  }
}
