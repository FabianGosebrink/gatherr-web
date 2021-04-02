import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmResult } from './confirm-result';

@Component({
  selector: 'workspace-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  @Input() questionText = '';
  @Input() okText = 'Ok';
  @Input() cancelText = 'Cancel';
  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ok() {
    this.clicked.emit(ConfirmResult.Ok);
  }

  cancel() {
    this.clicked.emit(ConfirmResult.Cancel);
  }
}
