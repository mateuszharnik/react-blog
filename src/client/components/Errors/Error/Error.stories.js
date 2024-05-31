import ThemeContext from '@client/contexts/ThemeContext';
import Error from './index';
import '@client/libs.scss';
import '@client/index.scss';

export default {
  title: 'Components/Errors/Error',
  component: Error,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => <ThemeContext><Error {...args} /></ThemeContext>,
};
