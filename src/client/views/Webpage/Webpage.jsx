import { memo } from 'react';
import { lazyLoad } from '@client/utils/lazyLoadUtils';

const WebpageContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'webpage' */ '@client/views/Webpage/content/WebpageContent'),
});

const Webpage = memo(() => (
  <WebpageContent />
));

Webpage.displayName = 'Webpage';

export default Webpage;
