import { thunk, action } from 'easy-peasy';

const auth = {
  isSubmit: false,
  adminSignIn: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setIsSubmit(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/admin/sign-in', payload);

      if (response.data) {
        getStoreActions().user.setUser(response.data?.user);
        getStoreActions().tokens.setAccessToken(response.data?.accessToken);
      }

      res = response;
    } catch (error) {
      res = error.response;
    } finally {
      actions.setIsSubmit(false);
    }

    return res;
  }),
  signIn: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setIsSubmit(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/sign-in', payload);

      if (response.data) {
        getStoreActions().user.setUser(response.data?.user);
        getStoreActions().tokens.setAccessToken(response.data?.accessToken);
      }

      res = response;
    } catch (error) {
      res = error.response;
    } finally {
      actions.setIsSubmit(false);
    }

    return res;
  }),
  signOut: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setIsSubmit(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/sign-out', payload);

      if (response.status === 200) {
        getStoreActions().user.setUser(null);
        getStoreActions().tokens.setAccessToken('');
        getStoreActions().toasts.addToast({
          message: response?.data?.message,
          type: 'success',
          module: 'signIn',
        });
      } else {
        getStoreActions().toasts.addToast({
          message: response?.data?.message || 'Wystąpił błąd.',
          type: 'danger',
          module: 'signIn',
        });
      }

      res = response;
    } catch (error) {
      getStoreActions().toasts.addToast({
        message: error?.response?.data?.message || 'Wystąpił błąd.',
        type: 'danger',
        module: 'signIn',
      });

      res = error.response;
    } finally {
      actions.setIsSubmit(false);
    }

    return res;
  }),
  signUp: thunk(async (actions, payload, { getStoreActions }) => {
    actions.setIsSubmit(true);

    let res = null;

    try {
      const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

      const response = await axios.post('auth/sign-up', payload);

      if (response.data) {
        getStoreActions().user.setUser(response.data?.user);
        getStoreActions().tokens.setAccessToken(response.data?.accessToken);
      }

      res = response;
    } catch (error) {
      res = error.response;
    } finally {
      actions.setIsSubmit(false);
    }

    return res;
  }),
  setIsSubmit: action((state, payload) => {
    state.isSubmit = payload;
  }),
};

export default auth;
