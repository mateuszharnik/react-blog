import ThemeContext from '@client/context/ThemeContext';
import Error from './index';
import '@client/libs.scss';
import '@client/index.scss';

export default {
  title: 'Components/Error',
  component: Error,
};

const Template = (args) => <ThemeContext><Error {...args} /></ThemeContext>;

export const Default = Template.bind({});
