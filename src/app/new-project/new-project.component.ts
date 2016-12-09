import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  private showKey: ShowKey = ShowKey.Step1;
  private ShowKey = ShowKey;
  
  constructor() { }

  ngOnInit() {
  }

  submitNewProjectForm() {
    this.showKey = ShowKey.Step2;
  }

}

enum ShowKey {
  Step1,
  Step2
}