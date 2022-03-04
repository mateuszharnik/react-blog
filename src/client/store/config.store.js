import { thunk, action } from 'easy-peasy';

const config = {
  config: null,
  isLoading: false,
  isSubmit: false,
  updateConfig: thunk(async (actions, payload) => {
    actions.setIsSubmit(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.put('config', payload);

      actions.setConfig(response.data);
      actions.setIsSubmit(false);
      return response;
    } catch (error) {
      actions.setIsSubmit(false);
      return error.response;
    }
  }),
  fetchConfig: thunk(async (actions) => {
    actions.setIsLoading(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.get('config');

      actions.setConfig(response.data);
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
  setIsSubmit: action((state, payload) => {
    state.isSubmit = payload;
  }),
  setConfig: action((state, payload) => {
    state.config = payload;
  }),
};

export default config;
