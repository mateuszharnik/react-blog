import { memo } from 'react';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import WebpageNavigationContext from '@client/views/Webpage/contexts/WebpageNavigationContext';

const WebpageContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'webpage' */ '@client/views/Webpage/content/WebpageContent'),
});

const Webpage = memo(() => (
  <WebpageNavigationContext>
    <WebpageContent />
  </WebpageNavigationContext>
));

Webpage.displayName = 'Webpage';

export default Webpage;
