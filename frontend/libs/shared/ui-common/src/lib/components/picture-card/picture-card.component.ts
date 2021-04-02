import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'workspace-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.scss'],
})
export class PictureCardComponent implements OnInit {
  @Input() item: any;

  constructor() {}

  ngOnInit(): void {}
}
