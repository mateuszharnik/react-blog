import { thunk, action } from 'easy-peasy';

const tokens = {
  accessToken: '',
  isLoading: true,
  fetchRefreshToken: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setIsLoading(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/refresh-token');

      if (response.data) {
        actions.setAccessToken(response.data?.accessToken);
        getStoreActions().user.setUser(response.data?.user);
      }

      res = response;
    } catch (error) {
      res = error.response;
    } finally {
      actions.setIsLoading(false);
    }

    return res;
  }),
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setAccessToken: action((state, payload = '') => {
    state.accessToken = payload;
  }),
};

export default tokens;
