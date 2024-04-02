/* eslint-disable react/forbid-prop-types */
import { memo } from 'react';
import { any } from 'prop-types';
import ThemeContext from '@client/contexts/ThemeContext';
import LayerContext from '@client/contexts/LayerContext';
import PageSizeContext from '@client/contexts/PageSizeContext';
import LanguageContext from '@client/contexts/LanguageContext';
import ToastsContext from '@client/contexts/ToastsContext';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const Root = memo(({
  as: Component, wrapper: Wrapper, children, ...restProps
}) => (
  <div>
    <ThemeContext>
      <LayerContext>
        <LanguageContext>
          <PageSizeContext>
            <ToastsContext>
              <Wrapper>
                <Component {...restProps}>
                  {children}
                </Component>
              </Wrapper>
            </ToastsContext>
          </PageSizeContext>
        </LanguageContext>
      </LayerContext>
    </ThemeContext>
  </div>
));

Root.displayName = 'Root';

Root.propTypes = {
  as: any.isRequired,
  wrapper: any,
  children: childrenPropTypes.props,
};

Root.defaultProps = {
  wrapper: 'div',
  children: childrenPropTypes.default,
};

export default Root;
