import { aosService } from '@client/services/aosService';
import WelcomeBanner from './index';
import '@client/libs.scss';
import '@client/index.scss';

aosService.initAOS();

export default {
  title: 'Components/WelcomeBanner',
  component: WelcomeBanner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => <WelcomeBanner {...args} />,
};
