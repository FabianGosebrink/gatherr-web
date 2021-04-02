import { Component, Input, OnInit } from '@angular/core';
import { Category } from '@workspace/shared/data';

@Component({
  selector: 'workspace-group-categories',
  templateUrl: './group-categories.component.html',
  styleUrls: ['./group-categories.component.scss'],
})
export class GroupCategoriesComponent implements OnInit {
  @Input() groupCategories: Category[] = [];

  constructor() {}

  ngOnInit() {}
}
