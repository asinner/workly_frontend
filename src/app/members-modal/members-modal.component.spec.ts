/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MembersModalComponent } from './members-modal.component';

describe('MembersModalComponent', () => {
  let component: MembersModalComponent;
  let fixture: ComponentFixture<MembersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
