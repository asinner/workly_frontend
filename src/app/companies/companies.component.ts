import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Account } from '../data';
import { CompaniesStore, ShowKey } from './companies.store';
import { Subscription } from 'rxjs/Rx';
import { CompaniesActions } from './companies.actions';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  private ShowKey = ShowKey;
  private showKey: ShowKey = ShowKey.Step1;
  private companiesStoreSub: Subscription;
  private invitations: Invitation[] = [
    {email: ''},
    {email: ''},
    {email: ''},
  ];
  private account: Account = {
    id: null,
    name: '',
  } 

  constructor(private companiesStore: CompaniesStore, 
    private actions: CompaniesActions) { }

  ngOnInit() {
    this.companiesStoreSub = this.companiesStore.change.subscribe(this.getState.bind(this))
    this.getState();
  }

  getState() {
    this.showKey = this.companiesStore.getShowKey();
  }

  addInvite() {
    this.invitations.push({email: ''})
  }

  removeInvite(i) {
    this.invitations.splice(i, 1);
  }

  submitCompanyForm(e: any, form: NgForm) {
    e.preventDefault();
    if (form.invalid) return;
    this.actions.submitCompanyForm(this.account.name)
  }

  submitInviteForm(e: any, form: NgForm) {
    e.preventDefault();
    this.showKey = ShowKey.Step3;
  }

}

interface Invitation {
  email: string
}