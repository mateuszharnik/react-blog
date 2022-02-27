/* eslint-disable no-param-reassign */
import { thunk, action } from 'easy-peasy';

const csrf = {
  isLoading: false,
  fetchCSRFToken: thunk(async (actions) => {
    actions.setIsLoading(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.get('csrf-token');

      axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.CSRFToken;

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
};

export default csrf;
