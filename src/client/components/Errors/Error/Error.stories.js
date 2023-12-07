import ThemeContext from '@client/contexts/ThemeContext';
import Error from './index';
import '@client/libs.scss';
import '@client/index.scss';

export default {
  title: 'Components/Errors/Error',
  component: Error,
};

const Template = (args) => <ThemeContext><Error {...args} /></ThemeContext>;

export const Default = Template.bind({});
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
