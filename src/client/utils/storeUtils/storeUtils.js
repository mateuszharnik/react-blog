import { useCallback, useMemo, useRef } from 'react';
import { normalize, schema } from 'normalizr';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';
import get from 'lodash/get';
import set from 'lodash/set';
import unset from 'lodash/unset';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import { ApiResponseError } from '@client/errors/apiResponseError';
import { apiService } from '@client/services/apiService';
import { valuesConstants } from '@shared/constants';

const { API_STATUSES } = valuesConstants;

export const defaultKey = 'default';

const defaultActionNames = {
  ON_FETCHING: 'onFetching',
  ON_SUCCESS: 'onSuccess',
  ON_ERROR: 'onError',
  ON_TRIGGER: 'onTrigger',
  ON_CANCELED: 'onCanceled',
};

const defaultMetadata = {
  isIdle: true,
  isFetching: false,
  isLoading: true, // If isIdle or isFetching is true
  isError: false,
  isSuccess: false,
  isCanceled: false,
  isFinished: false, // If isSuccess, isCanceled or isError is true
  payload: null,
  error: null,
  result: null,
};

export const generateRequestMetadata = ({
  status = API_STATUSES.TRIGGERED, error = null, result = null, payload = null,
} = {}) => {
  const getRequestMetadataForStatus = cond([
    [
      ({ status: requestStatus }) => requestStatus === API_STATUSES.TRIGGERED,
      ({ payload: requestPayload }) => ({ ...defaultMetadata, payload: requestPayload }),
    ],
    [
      ({ status: requestStatus }) => requestStatus === API_STATUSES.FETCHING,
      ({ payload: requestPayload }) => ({
        ...defaultMetadata,
        isIdle: false,
        isFetching: true,
        payload: requestPayload,
      }),
    ],
    [
      ({ status: requestStatus }) => requestStatus === API_STATUSES.CANCELED,
      ({ payload: requestPayload }) => ({
        ...defaultMetadata,
        isIdle: false,
        isLoading: false,
        isCanceled: true,
        isFinished: true,
        payload: requestPayload,
      }),
    ],
    [
      ({ status: requestStatus }) => requestStatus === API_STATUSES.ERROR,
      ({ payload: requestPayload, error: requestError }) => ({
        ...defaultMetadata,
        isIdle: false,
        isLoading: false,
        isError: true,
        isFinished: true,
        payload: requestPayload,
        error: requestError,
      }),
    ],
    [
      ({ status: requestStatus }) => requestStatus === API_STATUSES.SUCCESS,
      ({ payload: requestPayload, result: requestResult }) => ({
        ...defaultMetadata,
        isIdle: false,
        isLoading: false,
        isSuccess: true,
        isFinished: true,
        payload: requestPayload,
        result: requestResult,
      }),
    ],
    [
      stubTrue,
      () => {
        throw new Error('Request status is invalid');
      },
    ],
  ]);

  return getRequestMetadataForStatus({
    status, error, result, payload,
  });
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

const onTriggerAction = (callback) => (state, data = {}) => {
  const {
    request, payload, result, error, key, context, options, params, shouldUpdateMetadata = true,
  } = data;
  const metadata = generateRequestMetadata({ status: API_STATUSES.TRIGGERED, payload });

  if (shouldUpdateMetadata) {
    setRequestMetadata({
      state, request, key, metadata, createIfNotExist: true,
    });
  }

  if (isFunction(callback)) {
    callback(state, {
      request, payload, result, error, shouldUpdateMetadata, key, context, options, params,
    });
  }
};

const onFetchingAction = (callback) => (state, data = {}) => {
  const {
    request, payload, result, error, key, context, options, params, shouldUpdateMetadata = true,
  } = data;
  const metadata = generateRequestMetadata({ status: API_STATUSES.FETCHING, payload });

  if (shouldUpdateMetadata) {
    setRequestMetadata({
      state, request, key, metadata,
    });
  }

  if (isFunction(callback)) {
    callback(state, {
      request, payload, result, error, shouldUpdateMetadata, key, context, options, params,
    });
  }
};

const onCanceledAction = (callback) => (state, data = {}) => {
  const {
    request, payload, result, error, key, context, options, params, shouldUpdateMetadata = true,
  } = data;
  const metadata = generateRequestMetadata({ status: API_STATUSES.CANCELED, payload });

  if (shouldUpdateMetadata) {
    setRequestMetadata({
      state, request, key, metadata,
    });
  }

  if (isFunction(callback)) {
    callback(state, {
      request, payload, result, error, shouldUpdateMetadata, key, context, options, params,
    });
  }
};

const onErrorAction = (callback) => (state, data = {}) => {
  const {
    request, payload, result, error, key, context, options, params, shouldUpdateMetadata = true,
  } = data;
  const metadata = generateRequestMetadata({ status: API_STATUSES.ERROR, payload, error });

  if (shouldUpdateMetadata) {
    setRequestMetadata({
      state, request, key, metadata,
    });
  }

  if (isFunction(callback)) {
    callback(state, {
      request, payload, result, error, shouldUpdateMetadata, key, context, options, params,
    });
  }
};

const onSuccessAction = (callback) => (state, data = {}) => {
  const {
    request, payload, result, error, key, context, options, params, shouldUpdateMetadata = true,
  } = data;
  const metadata = generateRequestMetadata({ status: API_STATUSES.SUCCESS, payload, result });

  if (shouldUpdateMetadata) {
    setRequestMetadata({
      state, request, key, metadata,
    });
  }

  if (isFunction(callback)) {
    callback(state, {
      request, payload, result, error, shouldUpdateMetadata, key, context, options, params,
    });
  }
};

const onResetAction = (request, callback) => (state, data = {}) => {
  const { key = defaultKey } = data;

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
    callback(state, { request, key });
  }
};

const createAction = ({
  request, action, onTrigger, onFetching, onSuccess, onError, onCanceled,
} = {}) => async (actions, data = {}, helpers) => {
  const { getStoreState } = helpers;

  const {
    onError: onActionError,
    onSuccess: onActionSuccess,
    onFetching: onActionFetching,
    onTrigger: onActionTrigger,
    onCanceled: onActionCanceled,
    ...restData
  } = data;

  const response = { result: null, error: null, payload: restData.payload };
  const payload = {
    ...restData, request, result: null, error: null,
  };

  actions[onTrigger || defaultActionNames.ON_TRIGGER](payload);
  if (isFunction(onActionTrigger)) await onActionTrigger(payload);

  try {
    actions[onFetching || defaultActionNames.ON_FETCHING](payload);
    if (isFunction(onActionFetching)) await onActionFetching(payload);

    const { data: result } = await action(actions, payload, helpers);

    actions[onSuccess || defaultActionNames.ON_SUCCESS]({ ...payload, result });
    if (isFunction(onActionSuccess)) await onActionSuccess({ ...payload, result });

    response.result = result;
  } catch (e) {
    const error = (e instanceof ApiResponseError) ? e : new ApiResponseError();

    if (error.shouldCheckForRefresh) {
      if (error.isRefreshTokenError) return window.location.reload();

      if (error.isPermissionError) {
        const { user } = getStoreState().userStore;
        const role = get(user, 'role', null);

        const userHasMissingPermission = error.missingPermissions.some(
          (missingPermission) => role[missingPermission],
        );

        if (userHasMissingPermission) return window.location.reload();
      }
    }

    if (error.isCanceled) {
      actions[onCanceled || defaultActionNames.ON_CANCELED](payload);
      if (isFunction(onActionCanceled)) await onActionCanceled(payload);
    } else {
      actions[onError || defaultActionNames.ON_ERROR]({ ...payload, error });
      if (isFunction(onActionError)) await onActionError({ ...payload, error });
    }

    response.error = error;
  }

  return response;
};

export const storeActions = {
  onTrigger: onTriggerAction,
  onFetching: onFetchingAction,
  onCanceled: onCanceledAction,
  onError: onErrorAction,
  onSuccess: onSuccessAction,
  onReset: onResetAction,
  createAction,
};

export const createStoreActionsHook = ({
  requests, key = defaultKey,
}) => ({
  request,
  action,
  resetMetadataAction,
  onError: onActionError,
  onCanceled: onActionCanceled,
  onSuccess: onActionSuccess,
  onFetching: onActionFetching,
  onTrigger: onActionTrigger,
}) => {
  const cancelToken = useRef(null);

  const metadata = useMemo(() => {
    if (requests?.[request]?.[key]) {
      return requests?.[request]?.[key];
    }

    return generateRequestMetadata();
  }, [requests]);

  const onError = useCallback((actions) => async (payload) => {
    if (isFunction(actions.onPayloadError)) {
      await actions.onPayloadError(payload);
    }

    if (isFunction(actions.onActionError)) {
      await actions.onActionError(payload);
    }
  }, []);

  const onCanceled = useCallback((actions) => async (payload) => {
    if (isFunction(actions.onPayloadCanceled)) {
      await actions.onPayloadCanceled(payload);
    }

    if (isFunction(actions.onActionCanceled)) {
      await actions.onActionCanceled(payload);
    }
  }, []);

  const onSuccess = useCallback((actions) => async (payload) => {
    if (isFunction(actions.onPayloadSuccess)) {
      await actions.onPayloadSuccess(payload);
    }

    if (isFunction(actions.onActionSuccess)) {
      await actions.onActionSuccess(payload);
    }
  }, []);

  const onFetching = useCallback((actions) => async (payload) => {
    if (isFunction(actions.onPayloadFetching)) {
      await actions.onPayloadFetching(payload);
    }

    if (isFunction(actions.onActionFetching)) {
      await actions.onActionFetching(payload);
    }
  }, []);

  const onTrigger = useCallback((actions) => async (payload) => {
    if (isFunction(actions.onPayloadTrigger)) {
      await actions.onPayloadTrigger(payload);
    }

    if (isFunction(actions.onActionTrigger)) {
      await actions.onActionTrigger(payload);
    }
  }, []);

  const storeAction = useCallback((data = {}) => {
    const cancelTokenSource = apiService.CancelToken.source();
    const defaultOption = { cancelToken: cancelTokenSource.token };
    cancelToken.current = cancelTokenSource;

    const {
      onError: onPayloadError,
      onSuccess: onPayloadSuccess,
      onFetching: onPayloadFetching,
      onTrigger: onPayloadTrigger,
      onCanceled: onPayloadCanceled,
      shouldUpdateMetadata = true,
      params = null,
      context = null,
      payload = null,
      options: dataOptions = null,
    } = data;

    const options = isObject(dataOptions) ? { ...dataOptions, ...defaultOption } : defaultOption;

    return action({
      key,
      payload,
      options,
      params,
      context,
      shouldUpdateMetadata,
      onError: onError({ onPayloadError, onActionError }),
      onCanceled: onCanceled({ onPayloadCanceled, onActionCanceled }),
      onSuccess: onSuccess({ onPayloadSuccess, onActionSuccess }),
      onFetching: onFetching({ onPayloadFetching, onActionFetching }),
      onTrigger: onTrigger({ onPayloadTrigger, onActionTrigger }),
    });
  }, [
    cancelToken,
    onActionError,
    onActionCanceled,
    onActionSuccess,
    onActionFetching,
    onActionTrigger,
  ]);

  const cancelAction = useCallback((message) => {
    cancelToken.current.cancel(message);
  }, [cancelToken]);

  const resetMetadata = useCallback(() => resetMetadataAction({ key }), []);

  return [storeAction, metadata, cancelAction, resetMetadata];
};

export const createEntityAdapter = ({
  selectId = 'id',
  sort = (data) => data,
  initialState = { ids: [], entities: {} },
}) => {
  const initialValues = cloneDeep(initialState);
  const entitySchema = new schema.Entity('entities', {}, { idAttribute: selectId });

  const normalizeData = (data) => {
    const normalizedData = normalize(data, [entitySchema]);

    return normalizedData.entities;
  };

  const synchronizeIdsWithEntities = (state) => {
    state.entities = sort(Object.values(state.entities)).reduce((acc, next) => {
      acc[next[selectId]] = next;

      return acc;
    }, {});
    state.ids = Object.keys(state.entities);
  };

  const addOne = (state, entity) => {
    const id = entity[selectId];

    if (!state.entities[id]) {
      state.entities[id] = entity;
      synchronizeIdsWithEntities(state);
    }
  };

  const addMany = (state, data) => {
    const entities = normalizeData(data);

    Object.keys(entities.entities).forEach((id) => {
      if (!state.entities[id]) {
        state.entities[id] = entities.entities[id];
      }
    });

    synchronizeIdsWithEntities(state);
  };

  const setOne = (state, entity) => {
    const id = entity[selectId];

    state.entities[id] = entity;
    synchronizeIdsWithEntities(state);
  };

  const setMany = (state, data) => {
    const entities = normalizeData(data);

    state.entities = { ...state.entities, ...entities.entities };
    synchronizeIdsWithEntities(state);
  };

  const setAll = (state, data) => {
    const entities = normalizeData(data);

    state.entities = { ...entities.entities };
    synchronizeIdsWithEntities(state);
  };

  const removeOne = (state, entityId) => {
    delete state.entities[entityId];
    synchronizeIdsWithEntities(state);
  };

  const removeMany = (state, entityIds) => {
    entityIds.forEach((id) => delete state.entities[id]);
    synchronizeIdsWithEntities(state);
  };

  const removeAll = (state) => {
    state.entities = {};
    state.ids = [];
  };

  const updateOne = (state, update) => {
    const { [selectId]: id, changes } = update;

    if (state.entities[id]) {
      state.entities[id] = { ...state.entities[id], ...changes };
      synchronizeIdsWithEntities(state);
    }
  };

  const updateMany = (state, updates) => {
    updates.forEach((update) => {
      const { [selectId]: id, changes } = update;

      if (state.entities[id]) {
        state.entities[id] = { ...state.entities[id], ...changes };
      }
    });

    synchronizeIdsWithEntities(state);
  };

  const upsertOne = (state, entity) => {
    const id = entity[selectId];

    if (state.entities[id]) {
      updateOne(state, { changes: entity, [selectId]: id });
    } else {
      addOne(state, entity);
    }
  };

  const upsertMany = (state, data) => {
    const entities = normalizeData(data);

    Object.entries(entities.entities).forEach(([id, entity]) => {
      if (state.entities[id]) {
        updateOne(state, { changes: entity, [selectId]: id });
      } else {
        addOne(state, entity);
      }
    });
  };

  const getInitialState = () => initialValues;

  const getOne = (state, entityId) => state.entities[entityId];

  const getMany = (state, entityIds) => {
    synchronizeIdsWithEntities(state);
    return pick(state.entities, entityIds);
  };

  const getAll = (state) => {
    synchronizeIdsWithEntities(state);
    return Object.values(state.entities);
  };

  return {
    addOne,
    addMany,
    setOne,
    setMany,
    setAll,
    removeOne,
    removeMany,
    removeAll,
    updateOne,
    updateMany,
    upsertOne,
    upsertMany,
    getOne,
    getMany,
    getAll,
    getInitialState,
  };
};
