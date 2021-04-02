import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import {
  signalrGroupMemberAdded,
  signalrGroupMemberRemoved,
} from '@workspace/groups/data';
import { EnvironmentService } from '@workspace/shared/environment';

@Injectable({ providedIn: 'root' })
export class GroupsMemberSignalRService {
  private connection: HubConnection;

  constructor(
    private environmentService: EnvironmentService,
    private store: Store<any>
  ) {}

  initGroupMemberSignalr() {
    if (this.connection?.state === HubConnectionState.Connected) {
      return;
    }

    console.log('initGroupMemberSignalr');

    this.connection = new HubConnectionBuilder()
      .withUrl(`${this.environmentService.getServerUrl()}groupmembershub`)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.registerOnEvents();
    this.connection.start().catch((err) => console.log(err.toString()));
  }

  stopConnection() {
    console.log('stopConnection GroupsMemberSignalRService');
    this.connection.stop().catch((err) => console.log(err.toString()));
  }

  private registerOnEvents() {
    this.connection.on('groupmember-added', (item) => {
      console.log('groupmember-added', item);
      this.store.dispatch(signalrGroupMemberAdded({ payload: item }));
    });

    this.connection.on('groupmember-removed', (item) => {
      console.log('groupmember-removed', item);
      this.store.dispatch(signalrGroupMemberRemoved({ payload: item }));
    });
  }
}
