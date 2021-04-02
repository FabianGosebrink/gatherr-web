import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import {
  signalrMeetupMemberAdded,
  signalrMeetupMemberRemoved,
} from '@workspace/groups/data';
import { EnvironmentService } from '@workspace/shared/environment';

@Injectable({ providedIn: 'root' })
export class MeetupMembersSignalRService {
  private connection: HubConnection;

  constructor(
    private environmentService: EnvironmentService,
    private store: Store<any>
  ) {}

  initMeetupMemberSignalr() {
    if (this.connection?.state === HubConnectionState.Connected) {
      return;
    }

    console.log('initMeetupMemberSignalr');

    this.connection = new HubConnectionBuilder()
      .withUrl(`${this.environmentService.getServerUrl()}meetupmembershub`)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.registerOnEvents();
    this.connection.start().catch((err) => console.log(err.toString()));
  }

  stopConnection() {
    console.log('stopConnection MeetupMembersSignalRService');
    this.connection.stop().catch((err) => console.log(err.toString()));
  }

  private registerOnEvents() {
    this.connection.on('meetupmember-added', (item) => {
      console.log('meetupmember-added', item);
      this.store.dispatch(signalrMeetupMemberAdded({ payload: item }));
    });

    this.connection.on('meetupmember-removed', (item) => {
      console.log('meetupmember-removed', item);
      this.store.dispatch(signalrMeetupMemberRemoved({ payload: item }));
    });
  }
}
