import { thunk, action } from 'easy-peasy';

const csrf = {
  isLoading: true,
  fetchCSRFToken: thunk(async (actions) => {
    actions.setIsLoading(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.get('csrf-token');

      axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.CSRFToken;

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
};

export default csrf;
