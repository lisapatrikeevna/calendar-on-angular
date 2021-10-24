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
  foolForm: FormGroup=new FormGroup({
    title:new FormControl(),
    completed: new FormControl(),
    description:new FormControl()
  })
  tasks: any = []
  updateTask:boolean= false

  constructor(public dateService: DateService,
              public todolistService: TodoListsService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  remove(task: Task) {
    //@ts-ignore
    this.todolistService.removeTask(task._id).subscribe(
      res=>{
        this.todolistService.getTaskList(this.dateService.dateFormat(task.date));
        console.log('removeTask res',res);
      },err=>console.log(err)
    )
  }

  update(task: Task) {
    const {title,completed,description} = this.foolForm.value
    const updatedTask: Task = {
      ...task,title,completed,description
      // title:this.foolForm.value.title,
      // completed: this.foolForm.value.completed,
      // description:this.foolForm.value.description,
    }
    console.log('updatedTask',updatedTask);
    this.todolistService.update(updatedTask).subscribe(resTask => {
      this.form.reset()
      this.todolistService.getTaskList(this.dateService.dateFormat(task.date))
    }, err => console.log(err))
  }
  change(task: Task) {
    this.updateTask=true
    this.foolForm.patchValue({
      title:task.title,
      completed:task.completed,
      description:task.description
    })
  }
  back(task:any){
    this.updateTask=false
  }
  submit() {
    const {title} = this.form.value
    const taskId = v1()
    const task: Task = {
      taskId,
      title,
      date: this.dateService.newDate.value
    }
    console.log('task',task);
    this.tasks.push(task)
    this.todolistService.create(task).subscribe(resTask => {
      // this.tasks.push(task)
      this.form.reset()
      this.todolistService.getTaskList(this.dateService.dateFormat(task.date))
    }, err => console.log(err))
  }
}
