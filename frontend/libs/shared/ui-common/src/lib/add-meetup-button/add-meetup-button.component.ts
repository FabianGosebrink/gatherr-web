import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'workspace-add-meetup-button',
  templateUrl: './add-meetup-button.component.html',
  styleUrls: ['./add-meetup-button.component.scss'],
})
export class AddMeetupButtonComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  navigateToMeetupAdd() {
    this.router.navigate([
      '/groups',
      this.activatedRoute.snapshot.params.id,
      'meetups',
      'create',
    ]);
  }
}
