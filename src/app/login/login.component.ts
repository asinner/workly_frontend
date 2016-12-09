import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginActions } from './login.actions';
import { LoginStore } from './login.store';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginErr: string;
  private loginStoreSub: Subscription;
  private isSubmitting: boolean;
  private credentials: Credentials = {
    email: '',
    password: ''
  }

  constructor(private actions: LoginActions, 
    private loginStore: LoginStore) { }

  ngOnInit() {
    this.loginStoreSub = this.loginStore.change.subscribe(this.getState.bind(this))
    this.getState();
  }

  private getState() {
    this.loginErr = this.loginStore.getLoginErr();
    this.isSubmitting = this.loginStore.getIsSubmitting();
  }

  submit(e: any, form: NgForm) {
    e.preventDefault();
    if (form.invalid) return;
    this.actions.submit(this.credentials.email, this.credentials.password);
  }
}

interface Credentials {
  email: string
  password: string
}
