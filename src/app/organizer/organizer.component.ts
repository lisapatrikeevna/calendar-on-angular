import {Component, OnInit} from '@angular/core'
import {DateService} from "../shared/date.service"
import {FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup
  tasks = []

  constructor(private dateService: DateService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  remove(task: any) {
  }

  submit() {
    const {title} = this.form.value
    console.log('title',title);
  }
}
