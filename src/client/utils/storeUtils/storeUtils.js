import { useCallback, useMemo, useRef } from 'react';
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

export const generateRequestMetadata = ({ status = API_STATUSES.TRIGGERED, error = '', data = null } = {}) => {
  const getRequestMetadataForStatus = cond([
    [
      ({ status: requestStatus }) => requestStatus === API_STATUSES.TRIGGERED,
      () => ({ ...defaultMetadata }),
    ],
    [
      ({ status: requestStatus }) => requestStatus === API_STATUSES.FETCHING,
      () => ({
        ...defaultMetadata,
        isIdle: false,
        isFetching: true,
      }),
    ],
    [
      ({ status: requestStatus }) => requestStatus === API_STATUSES.ERROR,
      ({ error: requestError }) => ({
        ...defaultMetadata,
        isIdle: false,
        isLoading: false,
        isError: true,
        isFinished: true,
        error: requestError,
      }),
    ],
    [
      ({ status: requestStatus }) => requestStatus === API_STATUSES.SUCCESS,
      ({ data: requestData }) => ({
        ...defaultMetadata,
        isIdle: false,
        isLoading: false,
        isSuccess: true,
        isFinished: true,
        data: requestData,
      }),
    ],
    [
      stubTrue,
      () => {
        throw new Error('Request status is invalid');
      },
    ],
  ]);

  return getRequestMetadataForStatus({ status, error, data });
};

export const checkIfStoreRequestExist = ({ requests = {}, request, key } = {}) => {
  if (!isObject(requests)) throw new Error('Requests should be an object');

  return isObject(get(requests, `${request}.${key}`));
};

export const setRequestMetadata = ({
  state, request, key, metadata, createIfNotExist = false,
} = {}) => {
  if (checkIfStoreRequestExist({ requests: state.requests, request, key })) {
    state.requests[request][key] = metadata;
  } else if (createIfNotExist) {
    set(state.requests, `${request}.${key}`, metadata);
  }
};

const onTriggerAction = (callback) => (state, payload = {}) => {
  const { request, shouldUpdateMetadata = false, key = defaultKey } = payload;
  const metadata = generateRequestMetadata({ status: API_STATUSES.TRIGGERED });

  if (shouldUpdateMetadata) {
    setRequestMetadata({
      state, request, key, metadata, createIfNotExist: true,
    });
  }

  if (isFunction(callback)) {
    callback(state, payload);
  }
};

const onFetchingAction = (callback) => (state, payload = {}) => {
  const { request, shouldUpdateMetadata = false, key = defaultKey } = payload;
  const metadata = generateRequestMetadata({ status: API_STATUSES.FETCHING });

  if (shouldUpdateMetadata) {
    setRequestMetadata({
      state, request, key, metadata,
    });
  }

  if (isFunction(callback)) {
    callback(state, payload);
  }
};

const onErrorAction = (callback) => (state, payload = {}) => {
  const {
    request, shouldUpdateMetadata = false, key = defaultKey, error,
  } = payload;
  const metadata = generateRequestMetadata({ status: API_STATUSES.ERROR, error });

  if (shouldUpdateMetadata) {
    setRequestMetadata({
      state, request, key, metadata,
    });
  }

  if (isFunction(callback)) {
    callback(state, payload);
  }
};

const onSuccessAction = (callback) => (state, payload = {}) => {
  const {
    request, shouldUpdateMetadata = false, key = defaultKey, result,
  } = payload;
  const metadata = generateRequestMetadata({ status: API_STATUSES.SUCCESS, data: result });

  if (shouldUpdateMetadata) {
    setRequestMetadata({
      state, request, key, metadata,
    });
  }

  if (isFunction(callback)) {
    callback(state, payload);
  }
};

const onResetAction = (request, callback) => (state, payload = {}) => {
  const { key = defaultKey } = payload;

  if (!isString(request)) {
    throw new Error('Request must be type of string');
  }

  if (checkIfStoreRequestExist({ requests: state.requests, request, key })) {
    unset(state.requests, `${request}.${key}`);

    if (!Object.keys(state.requests[request]).length) {
      unset(state.requests, `${request}`);
    }
  }

  if (isFunction(callback)) {
    callback(state, payload);
  }
};

const createAction = ({
  request, action, onTrigger, onFetching, onSuccess, onError,
} = {}) => async (actions, payload = {}, helpers) => {
  const shouldUpdateMetadata = payload.shouldUpdateMetadata || true;

  actions[onTrigger || defaultActionNames.ON_TRIGGER]({
    request, shouldUpdateMetadata, ...payload,
  });
  if (isFunction(payload.onTrigger)) await payload.onTrigger(payload);

  try {
    actions[onFetching || defaultActionNames.ON_FETCHING]({
      request, shouldUpdateMetadata, ...payload,
    });
    if (isFunction(payload.onFetching)) await payload.onFetching(payload);

    if (!isFunction(action)) throw new Error('Callback must be a function');

    const { data } = await action(actions, payload, helpers);

    actions[onSuccess || defaultActionNames.ON_SUCCESS]({
      request, result: data, shouldUpdateMetadata, ...payload,
    });
    if (isFunction(payload.onSuccess)) await payload.onSuccess(payload, data);
  } catch (e) {
    let error = null;

    if (apiService.isCancel(e)) {
      error = e.message;
    } else {
      const { data = {} } = e.response;
      error = data.messages ? data.messages[0].message : data;
    }

    actions[onError || defaultActionNames.ON_ERROR]({
      request, error, shouldUpdateMetadata, ...payload,
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

export const createStoreActionsHook = ({
  requests, key = defaultKey,
}) => ({
  request, action, resetMetadataAction,
}) => {
  const cancelToken = useRef(null);

  const metadata = useMemo(() => (
    requests?.[request]?.[key] || generateRequestMetadata()
  ), [requests]);

  const storeAction = useCallback((payload = {}) => {
    const cancelTokenSource = apiService.CancelToken.source();
    const options = { cancelToken: cancelTokenSource.token };

    cancelToken.current = cancelTokenSource;
    return action({ key, options, ...payload });
  }, [cancelToken]);

  const cancelAction = useCallback((message) => {
    cancelToken.current.cancel(message);
  }, [cancelToken]);

  const resetMetadata = useCallback(() => resetMetadataAction({ key }), []);

  return [storeAction, metadata, cancelAction, resetMetadata];
};
