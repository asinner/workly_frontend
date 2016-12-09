import { Input, Component, OnInit } from '@angular/core';
import { UserStore } from '../stores/user.store';
import { Subscription } from 'rxjs/Rx';
import { User } from '../data';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() id: number;
  private user: User;
  private userStoreSub: Subscription;

  constructor(private userStore: UserStore) { }

  ngOnInit() {
    this.userStoreSub = this.userStore.change.subscribe(this.getState.bind(this))
  }

  ngOnDestroy() {
    this.userStoreSub.unsubscribe();
  }

  private getState() {
    this.user = this.userStore.getUser(this.id)
  }

}
