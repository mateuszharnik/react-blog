import { thunk, action } from 'easy-peasy';

const config = {
  config: null,
  isLoading: true,
  isSubmit: false,
  updateConfig: thunk(async (actions, payload) => {
    actions.setIsSubmit(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.put('config', payload);

      actions.setConfig(response.data);

      res = response;
    } catch (error) {
      res = error.response;
    } finally {
      actions.setIsSubmit(false);
    }

    return res;
  }),
  fetchConfig: thunk(async (actions) => {
    actions.setIsLoading(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.get('config');

      actions.setConfig(response.data);

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
  setIsSubmit: action((state, payload) => {
    state.isSubmit = payload;
  }),
  setConfig: action((state, payload) => {
    state.config = payload;
  }),
};

export default config;
