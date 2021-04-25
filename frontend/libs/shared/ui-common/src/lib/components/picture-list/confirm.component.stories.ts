import { boolean, object, text } from '@storybook/addon-knobs';
import { Story } from '@storybook/angular';
import { SharedUiCommonModule } from '../../shared-ui-common.module';

export default { title: '<workspace-picture-list>' };

export const usage: Story = () => ({
  moduleMetadata: { imports: [SharedUiCommonModule] },
  template: `
    <workspace-picture-list
      [headline]="headline"
      [items]="items"
      [isLoading]="isLoading">
    </workspace-picture-list>
  `,
  props: {
    headline: text('Title', 'My pictures'),
    isLoading: boolean('Is Loading', false),
    items: object('Pictures', [
      {
        title: 'Love',
        name: 'Heart',
        description: 'Lightning Heart',
        imageUrl:
          'https://unsplash.com/photos/I4dR572y7l0/download?force=true&w=1920',
        date: new Date(),
      },
      {
        title: 'Sky',
        name: 'Clouds',
        description: 'A couple',
        imageUrl:
          'https://unsplash.com/photos/JIdmuiF9luY/download?force=true&w=1920',
        date: new Date(),
      },
      {
        title: 'Ring',
        name: 'Get engaged',
        description: 'A hand with a ring',
        imageUrl:
          'https://unsplash.com/photos/pGKyqck99cg/download?force=true&w=1920',
        date: new Date(),
      },
    ]),
  },
});
