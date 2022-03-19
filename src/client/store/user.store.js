import { action } from 'easy-peasy';

const user = {
  user: null,
  isLoading: true,
  isSubmit: false,
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setIsSubmit: action((state, payload) => {
    state.isSubmit = payload;
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
};

export default user;
