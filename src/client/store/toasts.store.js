import { v4 as uuidv4 } from 'uuid';
import { action, thunk } from 'easy-peasy';

const defaultToast = {
  title: '',
  message: '',
  delay: 5000,
  autoClose: true,
  progressBar: true,
  theme: 'dark',
  type: 'primary',
  icon: '',
};

const toasts = {
  toasts: [],
  limit: 3,
  isLengthEqualLimit: false,
  showFromBottom: false,
  addToast: thunk((actions, payload, { getState }) => {
    actions.setIsLengthEqualLimit();

    if (getState().isLengthEqualLimit) return;

    const toast = {
      id: uuidv4(),
      ...defaultToast,
      ...payload,
    };

    actions.setToast(toast);

    return Promise.resolve(toast);
  }),
  setLimit: action((state, payload = 3) => {
    state.limit = payload;
  }),
  setPosition: action((state, payload = false) => {
    state.showFromBottom = payload;
  }),
  setIsLengthEqualLimit: action((state) => {
    state.isLengthEqualLimit = state.toasts.length === state.limit;
  }),
  setToast: action((state, toast) => {
    if (state.showFromBottom) {
      state.toasts = [toast, ...state.toasts];
    } else {
      state.toasts = [...state.toasts, toast];
    }
  }),
  removeToast: action((state, id) => {
    state.toasts = state.toasts.filter((toast) => toast.id !== id);
  }),
  removeToasts: action((state) => {
    state.toasts = [];
  }),
};

export default toasts;
