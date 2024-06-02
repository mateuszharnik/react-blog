import { memo, forwardRef } from 'react';
import { markdownPropTypes } from '@client/prop-types/markdownPropTypes';

const Markdown = memo(forwardRef(({
  html,
  ...restProps
}, markdownRef) => (
  <div
    ref={markdownRef}
    {...restProps}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: html }}
  />
)));

Markdown.displayName = 'Markdown';

Markdown.propTypes = markdownPropTypes.props;

export default Markdown;
