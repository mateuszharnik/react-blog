import { thunk, action } from 'easy-peasy';

const contact = {
  contact: null,
  isLoading: true,
  isSubmit: false,
  updateContact: thunk(async (actions, payload) => {
    actions.setIsSubmit(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.put('contact', payload);

      actions.setContact(response.data);

      res = response;
    } catch (error) {
      res = error.response;
    } finally {
      actions.setIsSubmit(false);
    }

    return res;
  }),
  fetchContact: thunk(async (actions) => {
    actions.setIsLoading(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.get('contact');

      actions.setContact(response.data);

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
  setContact: action((state, payload) => {
    state.contact = payload;
  }),
};

export default contact;
