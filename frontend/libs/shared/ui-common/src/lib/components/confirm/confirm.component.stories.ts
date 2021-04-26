import { text } from '@storybook/addon-knobs';
import { Story } from '@storybook/angular';
import { SharedUiCommonModule } from '../../shared-ui-common.module';

export default { title: '<workspace-confirm>' };

export const usage: Story = () => ({
  moduleMetadata: { imports: [SharedUiCommonModule] },
  template: `
    <workspace-confirm
      [questionText]="questionText"
      [okText]="okText"
      [cancelText]="cancelText">
    </workspace-confirm>
  `,
  props: {
    questionText: text('Question', 'Are you sure you want to leave?'),
    okText: text('Ok Text', 'You have left successfully.'),
    cancelText: text('Cancel Text', 'Nice, you want to stay a little longer.'),
  },
});
