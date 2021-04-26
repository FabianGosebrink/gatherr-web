import { object } from '@storybook/addon-knobs';
import { Story } from '@storybook/angular';
import { SharedUiCommonModule } from '../../shared-ui-common.module';

export default { title: '<workspace-picture-card>' };

export const usage: Story = () => ({
  moduleMetadata: { imports: [SharedUiCommonModule] },
  template: `
    <workspace-picture-card
      [item]="item">
    </workspace-picture-card>
  `,
  props: {
    item: object('Picture', {
      title: 'Love',
      name: 'Heart',
      description: 'Lightning Heart',
      imageUrl:
        'https://unsplash.com/photos/I4dR572y7l0/download?force=true&w=1920',
      date: new Date(),
    }),
  },
});
