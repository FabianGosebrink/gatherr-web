import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { signalrGroupAdded } from '@workspace/groups/data';
import { EnvironmentService } from '@workspace/shared/environment';

@Injectable({ providedIn: 'root' })
export class GroupsSignalRService {
  private connection: HubConnection;

  constructor(
    private environmentService: EnvironmentService,
    private store: Store<any>
  ) {}

  initGroupsSignalr() {
    if (this.connection?.state === HubConnectionState.Connected) {
      return;
    }

    console.log('initGroupsSignalr');

    this.connection = new HubConnectionBuilder()
      .withUrl(`${this.environmentService.getServerUrl()}groupshub`)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.registerOnEvents();
    this.connection.start().catch((err) => console.log(err.toString()));
  }

  stopConnection() {
    console.log('stopConnection GroupsSignalRService');
    this.connection.stop().catch((err) => console.log(err.toString()));
  }

  private registerOnEvents() {
    this.connection.on('group-added', (item) => {
      this.store.dispatch(signalrGroupAdded({ payload: item }));
    });
  }
}
