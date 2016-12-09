import { Input, Component, OnInit } from '@angular/core';
@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  @Input() user: any;

  // constructor() { }

  ngOnInit() {
  }

}
