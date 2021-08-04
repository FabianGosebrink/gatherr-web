import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'workspace-add-gathering-button',
  templateUrl: './add-gathering-button.component.html',
  styleUrls: ['./add-gathering-button.component.scss'],
})
export class AddGatheringButtonComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  navigateToGatheringAdd() {
    this.router.navigate([
      '/groups',
      this.activatedRoute.snapshot.params.id,
      'gatherings',
      'create',
    ]);
  }
}
