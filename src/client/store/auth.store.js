import { thunk, action } from 'easy-peasy';

const auth = {
  message: '',
  isError: false,
  isSubmit: false,
  adminSignIn: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setMessage();
    actions.setIsError();
    actions.setIsSubmit(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/admin/sign-in', payload);

      if (response.data) {
        getStoreActions().user.setUser(response.data?.user);
        getStoreActions().tokens.setAccessToken(response.data?.accessToken);
      }

      actions.setIsSubmit(false);

      return response;
    } catch (error) {
      actions.setIsSubmit(false);

      return error.response;
    }
  }),
  signIn: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setMessage();
    actions.setIsError();
    actions.setIsSubmit(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/sign-in', payload);

      if (response.data) {
        getStoreActions().user.setUser(response.data?.user);
        getStoreActions().tokens.setAccessToken(response.data?.accessToken);
      }

      actions.setIsSubmit(false);

      return response;
    } catch (error) {
      actions.setIsSubmit(false);

      return error.response;
    }
  }),
  signOut: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setMessage();
    actions.setIsError();
    actions.setIsSubmit(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/sign-out', payload);

      if (response.status === 200) {
        getStoreActions().user.setUser(null);
        getStoreActions().tokens.setAccessToken('');
        actions.setMessage(response?.data?.message);
      } else {
        actions.setMessage(response?.data?.message || 'Wystąpił błąd.');
        actions.setIsError(true);
      }

      actions.setIsSubmit(false);

      return response;
    } catch (error) {
      actions.setMessage(error?.response?.data?.message || 'Wystąpił błąd.');
      actions.setIsError(true);
      actions.setIsSubmit(false);

      return error.response;
    }
  }),
  signUp: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setMessage();
    actions.setIsError();
    actions.setIsSubmit(true);

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/sign-up', payload);

      if (response.data) {
        getStoreActions().user.setUser(response.data?.user);
        getStoreActions().tokens.setAccessToken(response.data?.accessToken);
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
  setMessage: action((state, payload = '') => {
    state.message = payload;
  }),
  setIsError: action((state, payload = false) => {
    state.isError = payload;
  }),
};

export default auth;
