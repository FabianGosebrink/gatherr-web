import { text } from '@storybook/addon-knobs';
import { Story } from '@storybook/angular';
import { GatherrUiModule } from '../gatherr-ui.module';

export default { title: '<grr-button>' };

export const usage: Story = () => ({
  moduleMetadata: { imports: [GatherrUiModule] },
  template: `
    <grr-button>{{ caption }}</grr-button>
  `,
  props: {
    caption: text('Caption', 'Click here to continue'),
  },
});
