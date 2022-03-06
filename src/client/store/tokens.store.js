import { thunk, action } from 'easy-peasy';

const tokens = {
  accessToken: '',
  isLoading: false,
  fetchRefreshToken: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setIsLoading(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/refresh-token');

      if (response.data) {
        actions.setAccessToken(response.data?.accessToken);
        getStoreActions().user.setUser(response.data?.user);
      }

      actions.setIsLoading(false);

      return response;
    } catch (error) {
      actions.setIsLoading(false);

      return error.response;
    }
  }),
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setAccessToken: action((state, payload = '') => {
    state.accessToken = payload;
  }),
};

export default tokens;
