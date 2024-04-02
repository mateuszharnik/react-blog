import { memo, useEffect, createRef } from 'react';
import { render as originalRender } from '@testing-library/react';
import omit from 'lodash/omit';
import StoreProvider from '@client/providers/storeProvider';
import I18nextProvider from '@client/providers/i18nextProvider';
import TestQueryClientProvider from '@client/utils/testUtils/providers/testQueryClientProvider';
import TestRouterProvider from '@client/utils/testUtils/providers/testRouterProvider';
import { routesConstants } from '@shared/constants';
import Root from './Root';

export const render = async (Component, options = {}) => {
  const {
    wrapper: Wrapper, routerPath = routesConstants.ROOT, props = {}, children, ...restOptions
  } = options;
  const restProps = omit(props, ['as']);

  const as = memo(Component);
  const wrapper = Wrapper ? memo(Wrapper) : undefined;

  const result = originalRender(
    <Root
      as={as}
      wrapper={wrapper}
      {...restProps}
    >
      {children}
    </Root>,
    {
      ...restOptions,
      wrapper: memo(({ children: childrenComponent }) => (
        <StoreProvider>
          <TestRouterProvider routerPath={routerPath}>
            <I18nextProvider>
              <TestQueryClientProvider>
                {childrenComponent}
              </TestQueryClientProvider>
            </I18nextProvider>
          </TestRouterProvider>
        </StoreProvider>
      )),
    },
  );

  return {
    ...result,
    rerender: async (newProps = {}) => {
      const mergedProps = { ...restProps, ...newProps };

      return result.rerender(
        <Root
          as={as}
          wrapper={wrapper}
          {...mergedProps}
        >
          {children}
        </Root>,
      );
    },
  };
};

export const renderHook = async (hook, options = {}) => {
  const { wrapper, props = {}, ...restOptions } = options;
  const restProps = omit(props, ['as']);

  const hookData = createRef();

  const Wrapper = memo((hookProps) => {
    const result = hook(hookProps);

    useEffect(() => {
      hookData.current = result;
    }, [result]);

    return <div />;
  });

  const result = await render(Wrapper, {
    ...restOptions,
    props: restProps,
    wrapper,
  });

  return {
    ...result,
    result: hookData,
  };
};

export const createWrapperComponent = (component) => memo(component);
