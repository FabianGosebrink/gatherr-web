import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromGroupStore from '@workspace/groups/data';
import { GroupsMemberSignalRService } from '@workspace/groups/utils';
import {
  Category,
  Group,
  GroupLinks,
  PagingMetadata,
} from '@workspace/shared/data';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'workspace-groups-overview',
  templateUrl: './groups-overview.component.html',
  styleUrls: ['./groups-overview.component.scss'],
})
export class GroupsOverviewComponent implements OnInit, OnDestroy {
  items$: Observable<Group[]>;
  links$: Observable<GroupLinks[]>;
  pageinationMetadata$: Observable<PagingMetadata>;
  loading$: Observable<boolean>;
  form: FormGroup;

  get currentCategory() {
    return this.activatedRoute.snapshot.queryParams.category;
  }

  constructor(
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location,
    private groupsMemberSignalRService: GroupsMemberSignalRService
  ) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(fromGroupStore.selectAllEntities));
    this.links$ = this.store.pipe(select(fromGroupStore.selectLinks));
    this.pageinationMetadata$ = this.store.pipe(
      select(fromGroupStore.selectPaginationMetadata)
    );
    this.loading$ = this.store.pipe(select(fromGroupStore.selectGroupsLoading));

    this.form = this.formBuilder.group({
      groupname: ['', Validators.required],
    });

    this.form.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.store.dispatch(
        fromGroupStore.getAllGroups({
          query: value.groupname,
          category: this.activatedRoute.snapshot.queryParams.category,
        })
      );
    });

    this.queryData();

    this.groupsMemberSignalRService.initGroupMemberSignalr();
  }

  ngOnDestroy(): void {
    this.groupsMemberSignalRService.stopConnection();
  }

  private queryData() {
    this.store.dispatch(
      fromGroupStore.getAllGroups({
        query: '',
        category: this.activatedRoute.snapshot.queryParams.category,
      })
    );
  }

  goToPage(page: number) {
    this.store.dispatch(
      fromGroupStore.getAllGroups({
        query: this.form.controls.groupname.value,
        page,
      })
    );
  }

  showAllGroups() {
    this.router.navigate(['/groups']).then(() => this.queryData());
  }

  goToCategory(category: Category) {
    this.router
      .navigate(['/groups'], {
        queryParams: { category: category.name },
      })
      .then(() => this.queryData());
  }
}
