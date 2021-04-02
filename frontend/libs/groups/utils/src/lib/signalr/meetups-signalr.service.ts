import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import {
  signalrMeetupAdded,
  signalrMeetupRemoved,
} from '@workspace/groups/data';
import { Meetup, ModelDescriptor } from '@workspace/shared/data';
import { EnvironmentService } from '@workspace/shared/environment';

@Injectable({ providedIn: 'root' })
export class MeetupsSignalRService {
  private connection: HubConnection;

  constructor(
    private environmentService: EnvironmentService,
    private store: Store<any>
  ) {}

  initMeetupSignalr() {
    if (this.connection?.state === HubConnectionState.Connected) {
      return;
    }

    console.log('stopConnection MeetupsSignalRService');

    this.connection = new HubConnectionBuilder()
      .withUrl(`${this.environmentService.getServerUrl()}meetupshub`)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.registerOnEvents();
    this.connection.start().catch((err) => console.log(err.toString()));
  }

  stopConnection() {
    console.log('stopConnection MeetupsSignalRService');
    this.connection.stop().catch((err) => console.log(err.toString()));
  }

  private registerOnEvents() {
    this.connection.on('meetup-removed', (item) => {
      this.store.dispatch(signalrMeetupRemoved({ payload: item }));
    });

    this.connection.on('meetup-added', (item: ModelDescriptor<Meetup>) => {
      this.store.dispatch(
        signalrMeetupAdded({
          meetup: item,
        })
      );
    });
  }
}
