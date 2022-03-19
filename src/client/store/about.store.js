import { thunk, action } from 'easy-peasy';

const about = {
  about: null,
  isLoading: true,
  isSubmit: false,
  updateAbout: thunk(async (actions, payload) => {
    actions.setIsSubmit(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.put('about', payload);

      actions.setAbout(response.data);

      res = response;
    } catch (error) {
      res = error.response;
    } finally {
      actions.setIsSubmit(false);
    }

    return res;
  }),
  fetchAbout: thunk(async (actions) => {
    actions.setIsLoading(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.get('about');

      actions.setAbout(response.data);

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
  setAbout: action((state, payload) => {
    state.about = payload;
  }),
};

export default about;
