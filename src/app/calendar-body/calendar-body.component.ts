import {Component, OnInit} from '@angular/core';
import {DateService} from "../shared/date.service";
import {TodoListsService} from "../shared/todoLists.service";

interface Day {
  value: any
  active: boolean
  disabled: boolean
  selected: boolean
}


interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent implements OnInit {
  calendar: Week[] = [];
  taskList: Task[] = []

  constructor(private dateService: DateService,
              private todolistService: TodoListsService) {
    console.log('constructor newDate', dateService.newDate.value);
  }

  ngOnInit() {
    this.dateService.newDate.subscribe(this.generate2.bind(this))
    // this.dateService.newDate.subscribe((date) => {
    //   console.log('subscribe',date);
    //   this.generate2(date)})
    this.getTasks(this.dateService.newDate.value)
    // this.dateService.newDate.subscribe(this.getTasks.bind(this))
    // this.dateService.newDate.subscribe((date) => {
    //   console.log('subscribe getTasks',date);
    //   this.getTasks(date)})

  }

  getLastDayOfMonth(year: number, month: number) {
    let date = new Date(year, month + 1, 0);
    return date
  }

  getLastSunday(year: number, month: number) {
    let d = new Date(year, month, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }

  getLastSaturday(year: number, month: number) {
    let d = new Date(year, month, 0);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }

  copyHandler(d: any) {
    return new Date(d.valueOf())
  }

  newDay(d: any, n: any) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
  }

  generate2(day: Date) {
    let now = new Date(day.valueOf())
    let month = now.getMonth()
    let year = now.getUTCFullYear()
    let lastDayOfPreviousMonth = new Date(now.setDate(0));
    let lastSundayOfPreviousMonth = this.getLastSunday(year, month)
    let firstSaturdayOfNextMonth = this.getLastSaturday(year, month + 2);
    let lastDayOfCurrentMonth = this.getLastDayOfMonth(year, month + 1);
    let startDay = this.newDay(lastSundayOfPreviousMonth, -1)

    let date = 0
    let calendarDate = this.copyHandler(startDay)
    const calendar: any = []
    while (date <= 5) {
      date = date + 1
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            calendarDate = this.newDay(calendarDate, +1)
            const value = calendarDate
            let active = lastSundayOfPreviousMonth.getMonth() !== calendarDate.getMonth() &&
            lastDayOfCurrentMonth.getMonth() !== calendarDate.getMonth() ? true : false
            const disabled = lastSundayOfPreviousMonth.getMonth() !== calendarDate.getMonth() &&
            lastDayOfCurrentMonth.getMonth() !== calendarDate.getMonth() ? false : true
            const selected = calendarDate.getDate() + calendarDate.getMonth() === this.copyHandler(day).getDate() + now.getMonth() + 1 ? true : false
            return {
              value, active, disabled, selected
            }
          })
      })

    }
    console.log('while value', calendar);
    this.calendar = calendar
  }

  select(day: any) {
    this.dateService.changeDate(day)
    this.getTasks(day)
  }

  getTasks(date: any) {
    this.todolistService.getTaskList(this.dateService.dateFormat(date))
  }
}
