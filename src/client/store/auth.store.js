import { thunk, action } from 'easy-peasy';

const auth = {
  isSubmit: false,
  signIn: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setIsSubmit(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/sign-in', payload);

      if (response.data) {
        getStoreActions().user.setUser(response.data?.user);
        getStoreActions().tokens.setAccessToken(response.data?.token);
      }

      actions.setIsSubmit(false);

      return response;
    } catch (error) {
      actions.setIsSubmit(false);

      return error.response;
    }
  }),
  signUp: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setIsSubmit(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/sign-up', payload);

      if (response.data) {
        getStoreActions().user.setUser(response.data?.user);
        getStoreActions().tokens.setAccessToken(response.data?.token);
      }

      actions.setIsSubmit(false);

      return response;
    } catch (error) {
      actions.setIsSubmit(false);

      return error.response;
    }
  }),
  setIsSubmit: action((state, payload) => {
    state.isSubmit = payload;
  }),
};

export default auth;
