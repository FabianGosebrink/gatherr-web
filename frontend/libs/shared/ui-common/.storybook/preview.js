import { withKnobs } from '@storybook/addon-knobs';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator } from '@storybook/angular';

addDecorator(withKnobs);

export const parameters = {
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      custom: {
        name: 'Custom',
        styles: {
          width: '650px',
          height: '450px',
        },
      },
    },
    defaultViewport: 'custom',
  },
};
