import { TranslocoConfig, TranslocoTestingModule } from '@ngneat/transloco';

export function getTranslocoModule(config: Partial<TranslocoConfig> = {}) {
  return TranslocoTestingModule.withLangs(
    {},
    {
      availableLangs: ['en'],
      defaultLang: 'en',
      ...config,
    }
  );
}
