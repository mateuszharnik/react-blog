import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import get from 'lodash/get';
import set from 'lodash/set';
import unset from 'lodash/unset';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { apiService } from '@client/services/apiService';
import { valuesConstants } from '@shared/constants';

const { API_STATUSES } = valuesConstants;

export const defaultKey = 'default';

const defaultActionNames = {
  ON_FETCHING: 'onFetching',
  ON_SUCCESS: 'onSuccess',
  ON_ERROR: 'onError',
  ON_TRIGGER: 'onTrigger',
};

const defaultMetadata = {
  isIdle: true,
  isFetching: false,
  isLoading: true, // If isIdle or isFetching is true
  isError: false,
  isSuccess: false,
  isFinished: false, // If isSuccess or isError is true
  error: '',
  data: null,
};

export const generateEventMetadata = ({ status = API_STATUSES.TRIGGERED, error = '', data = null } = {}) => {
  const getEventMetadataForStatus = cond([
    [
      ({ status: eventStatus }) => eventStatus === API_STATUSES.TRIGGERED,
      () => ({ ...defaultMetadata }),
    ],
    [
      ({ status: eventStatus }) => eventStatus === API_STATUSES.FETCHING,
      () => ({
        ...defaultMetadata,
        isIdle: false,
        isFetching: true,
      }),
    ],
    [
      ({ status: eventStatus }) => eventStatus === API_STATUSES.ERROR,
      ({ error: eventError }) => ({
        ...defaultMetadata,
        isIdle: false,
        isLoading: false,
        isError: true,
        isFinished: true,
        error: eventError,
      }),
    ],
    [
      ({ status: eventStatus }) => eventStatus === API_STATUSES.SUCCESS,
      ({ data: eventData }) => ({
        ...defaultMetadata,
        isIdle: false,
        isLoading: false,
        isSuccess: true,
        isFinished: true,
        data: eventData,
      }),
    ],
    [
      stubTrue,
      () => {
        throw new Error('Event status is invalid');
      },
    ],
  ]);

  return getEventMetadataForStatus({ status, error, data });
};

export const checkIfStoreEventExist = ({ events = {}, event, key } = {}) => {
  if (!isObject(events)) throw new Error('Events should be an object');

  return isObject(get(events, `${event}.${key}`));
};

export const setEventMetadata = ({
  state, event, key, metadata, createIfNotExist = false,
} = {}) => {
  if (checkIfStoreEventExist({ events: state.events, event, key })) {
    state.events[event][key] = metadata;
  } else if (createIfNotExist) {
    set(state.events, `${event}.${key}`, metadata);
  }
};

const onTriggerAction = (callback) => (state, payload = {}) => {
  const { event, shouldUpdateMetadata = false, key = defaultKey } = payload;
  const metadata = generateEventMetadata({ status: API_STATUSES.TRIGGERED });

  if (shouldUpdateMetadata) {
    setEventMetadata({
      state, event, key, metadata, createIfNotExist: true,
    });
  }

  if (isFunction(callback)) {
    callback(state, payload);
  }
};

const onFetchingAction = (callback) => (state, payload = {}) => {
  const { event, shouldUpdateMetadata = false, key = defaultKey } = payload;
  const metadata = generateEventMetadata({ status: API_STATUSES.FETCHING });

  if (shouldUpdateMetadata) {
    setEventMetadata({
      state, event, key, metadata,
    });
  }

  if (isFunction(callback)) {
    callback(state, payload);
  }
};

const onErrorAction = (callback) => (state, payload = {}) => {
  const {
    event, shouldUpdateMetadata = false, key = defaultKey, error,
  } = payload;
  const metadata = generateEventMetadata({ status: API_STATUSES.ERROR, error });

  if (shouldUpdateMetadata) {
    setEventMetadata({
      state, event, key, metadata,
    });
  }

  if (isFunction(callback)) {
    callback(state, payload);
  }
};

const onSuccessAction = (callback) => (state, payload = {}) => {
  const {
    event, shouldUpdateMetadata = false, key = defaultKey, result,
  } = payload;
  const metadata = generateEventMetadata({ status: API_STATUSES.SUCCESS, data: result });

  if (shouldUpdateMetadata) {
    setEventMetadata({
      state, event, key, metadata,
    });
  }

  if (isFunction(callback)) {
    callback(state, payload);
  }
};

const onResetAction = (event, callback) => (state, payload = {}) => {
  const { key = defaultKey } = payload;

  if (!isString(event)) {
    throw new Error('Event must be type of string');
  }

  if (checkIfStoreEventExist({ events: state.events, event, key })) {
    unset(state.events, `${event}.${key}`);

    if (!Object.keys(state.events[event]).length) {
      unset(state.events, `${event}`);
    }
  }

  if (isFunction(callback)) {
    callback(state, payload);
  }
};

const createAction = ({
  event, action, onTrigger, onFetching, onSuccess, onError,
} = {}) => async (actions, payload = {}, helpers) => {
  const shouldUpdateMetadata = payload.shouldUpdateMetadata || true;

  actions[onTrigger || defaultActionNames.ON_TRIGGER]({
    event, shouldUpdateMetadata, ...payload,
  });
  if (isFunction(payload.onTrigger)) await payload.onTrigger(payload);

  try {
    actions[onFetching || defaultActionNames.ON_FETCHING]({
      event, shouldUpdateMetadata, ...payload,
    });
    if (isFunction(payload.onFetching)) await payload.onFetching(payload);

    if (!isFunction(action)) throw new Error('Callback must be a function');

    const { data } = await action(actions, payload, helpers);

    actions[onSuccess || defaultActionNames.ON_SUCCESS]({
      event, result: data, shouldUpdateMetadata, ...payload,
    });
    if (isFunction(payload.onSuccess)) await payload.onSuccess(payload, data);
  } catch (e) {
    let error = null;

    if (apiService.isCancel(e)) {
      error = e.message;
    } else {
      const { data } = e.response;
      error = data.messages ? data.messages[0].message : data;
    }

    actions[onError || defaultActionNames.ON_ERROR]({
      event, error, shouldUpdateMetadata, ...payload,
    });
    if (isFunction(payload.onError)) await payload.onError(payload, error);
  }
};

export const storeActions = {
  onTrigger: onTriggerAction,
  onFetching: onFetchingAction,
  onError: onErrorAction,
  onSuccess: onSuccessAction,
  onReset: onResetAction,
  createAction,
};
