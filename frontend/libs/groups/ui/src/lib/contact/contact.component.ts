import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'workspace-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  @Output() submitted = new EventEmitter();

  @Input() sending: boolean;

  form: FormGroup;

  constructor(public location: Location, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    this.submitted.emit(this.form.value);
  }

  private createForm() {
    this.form = this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
}
