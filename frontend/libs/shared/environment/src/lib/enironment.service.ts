import { Injectable } from '@angular/core';
import { SharedEnvironmentModuleConfig } from './shared-environment-config';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  constructor(private config: SharedEnvironmentModuleConfig) {}

  getApiUrl(): string {
    return this.config.apiUrl;
  }

  getServerUrl(): string {
    return this.config.serverUrl;
  }
}
