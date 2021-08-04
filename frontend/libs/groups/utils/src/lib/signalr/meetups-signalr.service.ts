import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import {
  signalrGatheringAdded,
  signalrGatheringRemoved,
} from '@workspace/groups/data';
import { Gathering, ModelDescriptor } from '@workspace/shared/data';
import { EnvironmentService } from '@workspace/shared/environment';

@Injectable({ providedIn: 'root' })
export class GatheringsSignalRService {
  private connection: HubConnection;

  constructor(
    private environmentService: EnvironmentService,
    private store: Store<any>
  ) {}

  initGatheringSignalr() {
    if (this.connection?.state === HubConnectionState.Connected) {
      return;
    }

    console.log('stopConnection GatheringsSignalRService');

    this.connection = new HubConnectionBuilder()
      .withUrl(`${this.environmentService.getServerUrl()}gatheringshub`)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.registerOnEvents();
    this.connection.start().catch((err) => console.log(err.toString()));
  }

  stopConnection() {
    console.log('stopConnection GatheringsSignalRService');
    this.connection.stop().catch((err) => console.log(err.toString()));
  }

  private registerOnEvents() {
    this.connection.on('gathering-removed', (item) => {
      this.store.dispatch(signalrGatheringRemoved({ payload: item }));
    });

    this.connection.on(
      'gathering-added',
      (item: ModelDescriptor<Gathering>) => {
        this.store.dispatch(
          signalrGatheringAdded({
            gathering: item,
          })
        );
      }
    );
  }
}
