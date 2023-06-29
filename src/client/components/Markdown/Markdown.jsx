import { memo } from 'react';
import { markdownPropTypes } from '@client/prop-types/markdownPropTypes';

const Markdown = memo(({ html, ...restProps }) => (
  <div
    {...restProps}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: html }}
  />
));

Markdown.displayName = 'Markdown';

Markdown.propTypes = markdownPropTypes.props;

export default Markdown;
