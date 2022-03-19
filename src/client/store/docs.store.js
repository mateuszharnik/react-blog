import { thunk, action } from 'easy-peasy';

const docs = {
  isSubmit: false,
  isLoading: true,
  signIn: thunk(async (actions, payload) => {
    actions.setIsSubmit(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('docs/sign-in', payload);

      res = response;
    } catch (error) {
      res = error.response;
    } finally {
      actions.setIsSubmit(false);
    }

    return res;
  }),
  fetchRefreshToken: thunk(async (actions) => {
    actions.setIsLoading(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('docs/refresh-token');

      res = response;
    } catch (error) {
      res = error.response;
    } finally {
      actions.setIsLoading(false);
    }

    return res;
  }),
  setIsSubmit: action((state, payload) => {
    state.isSubmit = payload;
  }),
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
};

export default docs;
