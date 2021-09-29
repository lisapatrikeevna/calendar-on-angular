import {Injectable} from "@angular/core";
import * as moment from 'moment';
import {BehaviorSubject, Observable, Observer} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment())
  public newDate: BehaviorSubject<any> = new BehaviorSubject(new Date())
  public time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  changeMonth(dir:number){
    console.log('start newDate',new Date())
    console.log('newDate',this.newDate.value)
    let month= this.newDate.value.getMonth()
    let value = this.newDate.value.setMonth(month+(dir))
    this.newDate.next(value.toUTCString())
  }
  changeDate(date: any): void {
    console.log('date',date);
    console.log('newDate',this.newDate);
    this.newDate.next(date);
  }
  changeMonthMoment(dir:number){
    const value = this.date.value.add(dir,'month')
    this.date.next(value)
  }
  changeDateMoment(date: any): void {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month()
    });
    this.date.next(value);
  }
}
