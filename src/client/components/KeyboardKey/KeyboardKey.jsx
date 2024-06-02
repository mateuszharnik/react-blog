import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const KeyboardKey = memo(forwardRef(({
  children,
  ...restProps
}, keyboardKeyRef) => (
  <kbd
    ref={keyboardKeyRef}
    {...restProps}
  >
    {children}
  </kbd>
)));

KeyboardKey.displayName = 'KeyboardKey';

KeyboardKey.propTypes = {
  children: childrenPropTypes.props,
};

KeyboardKey.defaultProps = {
  children: childrenPropTypes.default,
};

export default KeyboardKey;
