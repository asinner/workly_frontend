import { Input, Component, OnInit } from '@angular/core';
import { CommentStore } from '../stores/comment.store';
import { Subscription } from 'rxjs/Rx';
import { Comment } from '../data';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() id: number;
  private comment: Comment;
  private commentStoreSub: Subscription;

  constructor(private commentStore: CommentStore) {}

  ngOnInit() {
    this.commentStoreSub = this.commentStore.change.subscribe(this.getState.bind(this))
    this.getState()
  }

  ngOnDestroy() {
    this.commentStoreSub.unsubscribe();
  }

  private getState() {
    this.comment = this.commentStore.getComment(this.id)
  }

}
