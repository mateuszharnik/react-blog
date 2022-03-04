import { thunk, action } from 'easy-peasy';

const about = {
  about: null,
  isLoading: false,
  isSubmit: false,
  updateAbout: thunk(async (actions, payload) => {
    actions.setIsSubmit(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.put('about', payload);

      actions.setAbout(response.data);
      actions.setIsSubmit(false);
      return response;
    } catch (error) {
      actions.setIsSubmit(false);
      return error.response;
    }
  }),
  fetchAbout: thunk(async (actions) => {
    actions.setIsLoading(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.get('about');

      actions.setAbout(response.data);
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
  setAbout: action((state, payload) => {
    state.about = payload;
  }),
};

export default about;
