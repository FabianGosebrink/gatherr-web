import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Group, GroupLinks, PagingMetadata } from '@workspace/shared/data';

@Component({
  selector: 'workspace-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  private pageFieldCount = 5;

  @Input() items: Group[];
  @Input() links: GroupLinks[];
  @Input() paginationMetadata: PagingMetadata;

  @Output() goToPage = new EventEmitter();
  @Output() goToCategory = new EventEmitter();

  constructor(public router: Router) {}

  createRange(currentpage: number, maxPages: number) {
    let start = currentpage - (this.pageFieldCount - 1) / 2;
    let end = currentpage + (this.pageFieldCount - 1) / 2;

    if (start <= 0 || end === this.pageFieldCount) {
      start = 0;
      end = start + this.pageFieldCount - 1;
    }

    if (end >= maxPages) {
      end = maxPages;
      start = maxPages - this.pageFieldCount;
    }
    const array = [];

    for (let index = start; index < end; index++) {
      array.push(index);
    }
    return array.map((x) => (x = x + 1));
  }
}
