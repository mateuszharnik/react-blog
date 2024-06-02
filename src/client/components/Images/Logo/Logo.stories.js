import Logo from './index';
import '@client/libs.scss';
import '@client/index.scss';

export default {
  title: 'Components/Images/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number', description: 'Width of the logo.' },
    height: { control: 'number', description: 'Height of the logo.' },
    dark: { control: 'boolean', description: 'Switch between dark and light variant of the logo.' },
  },
};

export const Default = {
  render: (args) => <Logo {...args} />,
  args: {
    width: 40,
    height: 50,
    dark: true,
  },
};
