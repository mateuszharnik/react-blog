import Logo from './index';
import '@client/libs.scss';
import '@client/index.scss';

export default {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    dark: { control: 'boolean' },
  },
};

const Template = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 40,
  height: 50,
  dark: true,
};
