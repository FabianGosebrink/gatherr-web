import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'workspace-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss'],
})
export class PictureListComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() headline: string;
  @Input() isLoading: boolean;

  @Output() itemClicked = new EventEmitter();

  gridColumns = 6;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .pipe(tap((result) => console.log(result)))
      .subscribe();
  }
}
