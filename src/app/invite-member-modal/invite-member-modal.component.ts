import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'invite-member-modal',
  templateUrl: './invite-member-modal.component.html',
  styleUrls: ['./invite-member-modal.component.css']
})
export class InviteMemberModalComponent implements OnInit {
  
  private invitations: Invitation[] = [
    {email: ''},
    {email: ''},
    {email: ''},
  ]

  constructor() { }

  ngOnInit() {
  }

}

interface Invitation {
  email: string;
}