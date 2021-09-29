import {Component, OnInit} from '@angular/core';
import {DateService} from "../shared/date.service";

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

  constructor(private dateService: DateService) {}

  ngOnInit() {
    // this.dateService.date.subscribe(this.generate.bind(this))
    this.dateService.newDate.subscribe(this.generate2.bind(this))
    // this.dateService.newDate.subscribe(() => {this.generate2.bind(this)})
  }

  getLastDayOfMonth(year: number, month: number) {
    let date = new Date(year, month + 1, 0);
    return date
  }

  getLastSunday(year: number, month: number) {
    let d = new Date(year, month, 0);
    console.log(d.getDate());
    console.log(d.getDay());
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

  newDay(d: any,n:any) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() +n)
  }

  generate2(day: any) {
    let now = new Date(day.valueOf())
    // console.log('generate now', now);
    let month = now.getMonth()
    let year = now.getUTCFullYear()
    let lastDayOfPreviousMonth = new Date(now.setDate(0));
    let lastSundayOfPreviousMonth = this.getLastSunday(year, month)
    let firstSaturdayOfNextMonth = this.getLastSaturday(year, month + 2);
    let lastDayOfCurrentMonth = this.getLastDayOfMonth(year, month + 1);
    let startDay = this.newDay(lastSundayOfPreviousMonth,-1)

    let date = 0
    let calendarDate = this.copyHandler(startDay)

    const calendar: any = []
    while (date <= 5) {
      date = date + 1
      // calendarDate=this.newDay(calendarDate, +1)
      // calendarDate = new Date(lastDayOfPreviousMonth.setDate(date))
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            calendarDate=this.newDay(calendarDate, +1)
            const value = calendarDate
            let active = lastSundayOfPreviousMonth.getMonth() !== calendarDate.getMonth() &&
            lastDayOfCurrentMonth.getMonth() !== calendarDate.getMonth()  ? true: false
            const disabled = lastSundayOfPreviousMonth.getMonth() !== calendarDate.getMonth() &&
            lastDayOfCurrentMonth.getMonth() !== calendarDate.getMonth()  ? false: true
            const selected = false
            return {
              value,active,disabled,selected
            }
          })
      })

    }
    console.log('while value', calendar);
    this.calendar = calendar
  }



  select(day: any) {
    this.dateService.changeDate(day)
  }
}
