import { aosService } from '@client/services/aosService';
import WelcomeBanner from './index';
import '@client/libs.scss';
import '@client/index.scss';

aosService.init();

export default {
  title: 'Components/WelcomeBanner',
  component: WelcomeBanner,
};

const Template = (args) => <WelcomeBanner {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  controls: { hideNoControlsWarning: true },
};
