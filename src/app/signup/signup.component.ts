import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateUserReq } from '../services/api.service';
import { SignupActions } from './signup.actions';
import { SignupStore } from './signup.store';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private req: CreateUserReq = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  constructor(private actions: SignupActions, private signupStore: SignupStore) { }

  submit(e, form: NgForm) {
    e.preventDefault();
    if (!form.valid) {
      alert('Please fill out form correctly')
      return;
    }
    this.actions.submit(this.req);
  }

  ngOnInit() {
  }

}
