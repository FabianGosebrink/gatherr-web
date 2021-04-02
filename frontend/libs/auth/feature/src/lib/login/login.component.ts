import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '@workspace/auth/data';

@Component({
  selector: 'workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {}

  login() {
    this.store.dispatch(login());
  }
}
