import { Component, OnInit, Input } from '@angular/core';
import { CommentFormActions } from './comment-form.actions';
import { CommentFormStore } from './comment-form.store';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() taskId: number;
  private body: string;
  private commentFormStoreSub: Subscription;

  constructor(private actions: CommentFormActions, private commentFormStore: CommentFormStore) { }

  private submit(event: Event) {
    event.preventDefault();
    this.actions.submit(this.taskId, this.body)
  }

  private onKeypress(body: string) {
    this.actions.updateBody(body);
  }

  private getState() {
    this.body = this.commentFormStore.getBody();
  }

  ngOnInit() {
    this.commentFormStoreSub = this.commentFormStore.change.subscribe(this.getState.bind(this))
    this.getState();
  }

}
