import {Component} from '@angular/core';
import {DateService} from "../shared/date.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  // constructor(private  dateService: DateService) { }
  constructor(public  dateService: DateService) { }

  go(dir:number) {
    this.dateService.changeMonth(dir)
  }
}
