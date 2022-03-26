import { v4 as uuidv4 } from 'uuid';
import { action, thunk, computed } from 'easy-peasy';

const defaultToast = {
  title: '',
  message: '',
  delay: 6000,
  autoClose: true,
  progressBar: true,
  theme: 'light',
  type: 'primary',
  icon: '',
  module: '',
};

const toasts = {
  toasts: [],
  limit: 5,
  isLengthEqualLimit: false,
  showFromBottom: false,
  signInToasts: computed((state) => state.toasts.filter((toast) => toast.module === 'signIn')),
  signUpToasts: computed((state) => state.toasts.filter((toast) => toast.module === 'signUp')),
  adminToasts: computed((state) => state.toasts.filter((toast) => toast.module === 'admin')),
  webpageToasts: computed((state) => state.toasts.filter((toast) => toast.module === 'webpage')),
  docsToasts: computed((state) => state.toasts.filter((toast) => toast.module === 'docs')),
  addToast: thunk((actions, payload, { getState }) => {
    actions.setIsLengthEqualLimit(payload.module);

    if (getState().isLengthEqualLimit) return;

    const toast = {
      id: uuidv4(),
      ...defaultToast,
      ...payload,
    };

    actions.setToast(toast);

    return Promise.resolve(toast);
  }),
  setLimit: action((state, payload = 5) => {
    state.limit = payload;
  }),
  setPosition: action((state, payload = false) => {
    state.showFromBottom = payload;
  }),
  setIsLengthEqualLimit: action((state, module = '') => {
    const toastsFromModule = state.toasts.filter((toast) => toast.module === module);
    state.isLengthEqualLimit = toastsFromModule.length === state.limit;
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
  removeToasts: action((state, module = '') => {
    state.toasts = module ? state.toasts.filter((toast) => toast.module !== module) : [];
  }),
};

export default toasts;
