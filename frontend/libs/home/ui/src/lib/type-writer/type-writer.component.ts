import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'workspace-type-writer',
  templateUrl: './type-writer.component.html',
  styleUrls: ['./type-writer.component.scss'],
})
export class TypeWriterComponent implements OnInit {
  @Input() city = '';
  @Input() type = '';
  @Output() searched = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type: [this.type, Validators.required],
      city: [this.city, Validators.required],
    });

    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => this.searched.emit(value));
  }
}
