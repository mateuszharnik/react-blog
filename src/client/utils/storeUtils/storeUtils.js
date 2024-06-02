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
  const result = { data: null, error: null };

  actions[onTrigger || defaultActionNames.ON_TRIGGER]({
    request, shouldUpdateMetadata, ...payload,
  });
  if (isFunction(payload.onTrigger)) await payload.onTrigger(payload);

  try {
    actions[onFetching || defaultActionNames.ON_FETCHING]({
      request, shouldUpdateMetadata, ...payload,
    });
    if (isFunction(payload.onFetching)) await payload.onFetching(payload);

    const response = await action(actions, payload, helpers);

    actions[onSuccess || defaultActionNames.ON_SUCCESS]({
      request, result: response.data, shouldUpdateMetadata, ...payload,
    });
    if (isFunction(payload.onSuccess)) await payload.onSuccess(payload, response.data);

    result.data = response.data;
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

    result.error = error;
  }

  return result;
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
  request,
  action,
  resetMetadataAction,
  onError: onActionError,
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

  const onError = useCallback((actions) => async (payload, error) => {
    if (isFunction(actions.onPayloadError)) {
      await actions.onPayloadError({ payload, error });
    }

    if (isFunction(actions.onActionError)) {
      await actions.onActionError({ payload, error });
    }
  }, []);

  const onSuccess = useCallback((actions) => async (payload, data) => {
    if (isFunction(actions.onPayloadSuccess)) {
      await actions.onPayloadSuccess({ payload, data });
    }

    if (isFunction(actions.onActionSuccess)) {
      await actions.onActionSuccess({ payload, data });
    }
  }, []);

  const onFetching = useCallback((actions) => async (payload) => {
    if (isFunction(actions.onPayloadFetching)) {
      await actions.onPayloadFetching({ payload });
    }

    if (isFunction(actions.onActionFetching)) {
      await actions.onActionFetching({ payload });
    }
  }, []);

  const onTrigger = useCallback((actions) => async (payload) => {
    if (isFunction(actions.onPayloadTrigger)) {
      await actions.onPayloadTrigger({ payload });
    }

    if (isFunction(actions.onActionTrigger)) {
      await actions.onActionTrigger({ payload });
    }
  }, []);

  const storeAction = useCallback((payload = {}) => {
    const cancelTokenSource = apiService.CancelToken.source();
    const options = { cancelToken: cancelTokenSource.token };
    cancelToken.current = cancelTokenSource;

    const {
      onError: onPayloadError,
      onSuccess: onPayloadSuccess,
      onFetching: onPayloadFetching,
      onTrigger: onPayloadTrigger,
      ...rest
    } = payload;

    return action({
      key,
      options,
      onError: isFunction(onPayloadError) || isFunction(onActionError)
        ? onError({ onPayloadError, onActionError }) : null,
      onSuccess: isFunction(onPayloadSuccess) || isFunction(onActionSuccess)
        ? onSuccess({ onPayloadSuccess, onActionSuccess }) : null,
      onFetching: isFunction(onPayloadFetching) || isFunction(onActionFetching)
        ? onFetching({ onPayloadFetching, onActionFetching }) : null,
      onTrigger: isFunction(onPayloadTrigger) || isFunction(onActionTrigger)
        ? onTrigger({ onPayloadTrigger, onActionTrigger }) : null,
      ...rest,
    });
  }, [
    cancelToken,
    onActionError,
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
