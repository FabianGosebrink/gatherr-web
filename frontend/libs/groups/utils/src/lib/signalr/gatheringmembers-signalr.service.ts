import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import {
  signalrGatheringMemberAdded,
  signalrGatheringMemberRemoved,
} from '@workspace/groups/data';
import { EnvironmentService } from '@workspace/shared/environment';

@Injectable({ providedIn: 'root' })
export class GatheringMembersSignalRService {
  private connection: HubConnection;

  constructor(
    private environmentService: EnvironmentService,
    private store: Store<any>
  ) {}

  initGatheringMemberSignalr() {
    if (this.connection?.state === HubConnectionState.Connected) {
      return;
    }

    console.log('initGatheringMemberSignalr');

    this.connection = new HubConnectionBuilder()
      .withUrl(`${this.environmentService.getServerUrl()}gatheringmembershub`)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.registerOnEvents();
    this.connection.start().catch((err) => console.log(err.toString()));
  }

  stopConnection() {
    console.log('stopConnection GatheringMembersSignalRService');
    this.connection.stop().catch((err) => console.log(err.toString()));
  }

  private registerOnEvents() {
    this.connection.on('gatheringmember-added', (item) => {
      console.log('gatheringmember-added', item);
      this.store.dispatch(signalrGatheringMemberAdded({ payload: item }));
    });

    this.connection.on('gatheringmember-removed', (item) => {
      console.log('gatheringmember-removed', item);
      this.store.dispatch(signalrGatheringMemberRemoved({ payload: item }));
    });
  }
}
