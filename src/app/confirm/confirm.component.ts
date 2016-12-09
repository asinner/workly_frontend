import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  private email: string = '';
  private querySub: Subscription;

  constructor(private route: ActivatedRoute) {
    this.querySub = this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.querySub.unsubscribe()
  }

}
