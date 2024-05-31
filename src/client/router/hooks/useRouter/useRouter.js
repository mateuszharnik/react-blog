import { useCallback, useMemo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { generatePath, getQuery } from '@client/utils/routerUtils';
import { routesConstants } from '@shared/constants';

export const useRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = useParams();

  const { pathname, search, hash } = location;

  const urlQuery = useMemo(() => getQuery(search), [search]);

  const fullPath = useMemo(() => pathname + search, [pathname, search]);

  const getPath = useCallback((to = '/', options = {}) => {
    const { params = {}, query = {} } = options;

    return generatePath(to, { params, query });
  }, []);

  const push = useCallback((to = '/', options = {}) => {
    const {
      state = {}, params = {}, query = {}, replace = false,
    } = options;

    const path = generatePath(to, { params, query });

    navigate(path, { state, replace });
  }, [navigate]);

  const signOut = useCallback((options = {}) => {
    const {
      state = {}, params = {}, query = {}, replace = false,
    } = options;

    const path = generatePath(routesConstants.AUTH.SIGN_OUT.ROOT, { params, query });

    navigate(path, { state: { ...state, signOut: true }, replace });
  }, [navigate]);

  const pushBackLocation = useCallback((to = '/', options = {}) => {
    const {
      state = {},
      params = {},
      query = {},
      backLocation = pathname + search,
      replace = false,
    } = options;

    push(to, {
      params,
      query,
      state: { ...state, backLocation },
      replace,
    });
  }, [push, pathname, search]);

  const replace = useCallback((to = '/', options = {}) => {
    const { state = {}, params = {}, query = {} } = options;

    push(to, {
      params,
      query,
      state,
      replace: true,
    });
  }, [push]);

  const go = useCallback((delta) => navigate(delta), [navigate]);

  const back = useCallback(() => go(-1), [go]);

  const forward = useCallback(() => go(1), [go]);

  return {
    history: {
      push,
      go,
      back,
      forward,
      replace,
      pushBackLocation,
      getPath,
      signOut,
    },
    location: {
      fullPath,
      hash,
      path: pathname,
      params: urlParams,
      query: urlQuery,
      search,
      state: location.state,
    },
  };
};
