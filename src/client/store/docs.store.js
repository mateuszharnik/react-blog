import { thunk, action } from 'easy-peasy';

const docs = {
  isSubmit: false,
  isLoading: false,
  signIn: thunk(async (actions, payload) => {
    actions.setIsSubmit(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('docs/sign-in', payload);

      actions.setIsSubmit(false);

      return response;
    } catch (error) {
      actions.setIsSubmit(false);

      return error.response;
    }
  }),
  fetchRefreshToken: thunk(async (actions) => {
    actions.setIsLoading(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('docs/refresh-token');

      actions.setIsLoading(false);

      return response;
    } catch (error) {
      actions.setIsLoading(false);

      return error.response;
    }
  }),
  setIsSubmit: action((state, payload) => {
    state.isSubmit = payload;
  }),
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
};

export default docs;
