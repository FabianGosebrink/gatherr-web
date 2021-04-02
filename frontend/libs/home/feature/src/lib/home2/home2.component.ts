import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  getCurrentPlace,
  getLocalMeetups,
  getMoreLocalMeetups,
  selectAllLocalMeetups,
  selectCurrentPlace,
  selectIsLoading,
} from '@workspace/home/data';
import { Meetup } from '@workspace/shared/data';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'workspace-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss'],
})
export class Home2Component implements OnInit {
  currentPlace: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  };

  currentSearchingPlace: {
    city: string;
    country: string;
    type: string;
  } = null;

  localMeetups$: Observable<Meetup[]>;
  isLoading$: Observable<boolean>;
  private last_known_scroll_position = 0;
  private ticking = false;

  images = [
    { path: 'assets/images/background-image-2.jpg' },
    { path: 'assets/images/background-image-1.jpg' },
  ];

  constructor(
    private store: Store<any>,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.localMeetups$ = this.store.pipe(
      select(selectAllLocalMeetups, { count: 8 })
    );

    this.store
      .pipe(select(selectCurrentPlace))
      .pipe(filter((currentPlace) => !!currentPlace))
      .subscribe((result) => {
        this.currentPlace = result;
        const { city, country } = result;
        this.currentSearchingPlace = { city, country, type: '*' };
        this.cd.detectChanges();
      });

    this.isLoading$ = this.store.pipe(select(selectIsLoading));

    this.store.dispatch(getCurrentPlace());

    // window.addEventListener('scroll', e => {
    //   this.last_known_scroll_position = window.scrollY;
    //   if (!this.ticking) {
    //     window.requestAnimationFrame(() => {
    //       this.doSomething(this.last_known_scroll_position);
    //       this.ticking = false;
    //     });
    //     this.ticking = true;
    //   }
    // });
  }

  doSomething(scroll_pos) {
    const scrollHeight = document.body.scrollHeight;
    const totalHeight = window.scrollY + window.innerHeight;

    if (totalHeight >= scrollHeight) {
      this.store.dispatch(
        getMoreLocalMeetups({
          payload: {
            city: this.currentSearchingPlace.city,
            country: this.currentSearchingPlace.country,
          },
        })
      );
    }
  }

  navigateTo(meetup: Meetup) {
    this.router.navigate([
      `groups/${meetup.groupLinkName}/meetups/${meetup.id}`,
    ]);
  }

  updateList({ city, type }) {
    this.currentSearchingPlace = { ...this.currentSearchingPlace, city, type };

    if (!city || !type) {
      return;
    }

    this.store.dispatch(
      getLocalMeetups({
        payload: {
          city: city,
          country: this.currentSearchingPlace.country,
          type: type,
        },
      })
    );
  }
}
