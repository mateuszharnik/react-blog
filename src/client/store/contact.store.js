import { thunk, action } from 'easy-peasy';

const contact = {
  contact: null,
  isLoading: false,
  isSubmit: false,
  updateContact: thunk(async (actions, payload) => {
    actions.setIsSubmit(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.put('contact', payload);

      actions.setContact(response.data);
      actions.setIsSubmit(false);

      return response;
    } catch (error) {
      actions.setIsSubmit(false);

      return error.response;
    }
  }),
  fetchContact: thunk(async (actions) => {
    actions.setIsLoading(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.get('contact');

      actions.setContact(response.data);
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
  setContact: action((state, payload) => {
    state.contact = payload;
  }),
};

export default contact;
