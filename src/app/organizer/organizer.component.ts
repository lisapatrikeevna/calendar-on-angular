import {Component, OnInit} from '@angular/core'
import {DateService} from "../shared/date.service"
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {Task, TodoListsService} from "../shared/todoLists.service"
import {v1} from 'uuid'

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
//@ts-ignore
  form: FormGroup
  tasks: any = []

  constructor(public dateService: DateService,
              public todolistService: TodoListsService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  remove(task: any) {
    this.todolistService.removeTask(task.taskId,task.date)
  }

  update(task: any) {}

  submit() {
    const {title} = this.form.value
    const taskId = v1()
    const task: Task = {
      taskId,
      title,
      date: this.dateService.newDate.value
    }
    this.tasks.push(task)
    this.todolistService.create(task).subscribe(resTask => {
      // this.tasks.push(task)
      this.form.reset()
      this.todolistService.getTaskList(this.dateService.dateFormat(task.date))
    }, err => console.log(err))

  }
}
