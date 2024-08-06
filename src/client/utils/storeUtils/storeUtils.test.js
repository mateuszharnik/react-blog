import { valuesConstants } from '@shared/constants';
import { generateRequestMetadata, checkIfStoreRequestExist } from './index';

const { API_STATUSES } = valuesConstants;

describe('storeUtils', () => {
  describe('generateRequestMetadata', () => {
    const defaultPayload = {
      status: 'INVALID',
      payload: { title: 'Title' },
    };

    it(`should return correct object for status '${API_STATUSES.TRIGGERED}'`, () => {
      expect(generateRequestMetadata({
        ...defaultPayload,
        status: API_STATUSES.TRIGGERED,
      })).toMatchObject({
        isIdle: true,
        isFetching: false,
        isLoading: true,
        isError: false,
        isSuccess: false,
        isCanceled: false,
        isFinished: false,
        error: null,
        result: null,
        payload: defaultPayload.payload,
      });
    });

    it(`should return correct object for status '${API_STATUSES.FETCHING}'`, () => {
      expect(generateRequestMetadata({
        ...defaultPayload,
        status: API_STATUSES.FETCHING,
      })).toMatchObject({
        isIdle: false,
        isFetching: true,
        isLoading: true,
        isError: false,
        isCanceled: false,
        isSuccess: false,
        isFinished: false,
        error: null,
        result: null,
        payload: defaultPayload.payload,
      });
    });

    it(`should return correct object for status '${API_STATUSES.CANCELED}'`, () => {
      expect(generateRequestMetadata({
        ...defaultPayload,
        status: API_STATUSES.CANCELED,
      })).toMatchObject({
        isIdle: false,
        isFetching: false,
        isLoading: false,
        isError: false,
        isCanceled: true,
        isSuccess: false,
        isFinished: true,
        error: null,
        result: null,
        payload: defaultPayload.payload,
      });
    });

    it(`should return correct object for status '${API_STATUSES.ERROR}'`, () => {
      expect(generateRequestMetadata({
        ...defaultPayload,
        error: 'Error',
        status: API_STATUSES.ERROR,
      })).toMatchObject({
        isIdle: false,
        isFetching: false,
        isLoading: false,
        isError: true,
        isCanceled: false,
        isSuccess: false,
        isFinished: true,
        error: 'Error',
        result: null,
        payload: defaultPayload.payload,
      });
    });

    it(`should return correct object for status '${API_STATUSES.SUCCESS}'`, () => {
      expect(generateRequestMetadata({
        ...defaultPayload,
        result: { title: 'Title' },
        status: API_STATUSES.SUCCESS,
      })).toMatchObject({
        isIdle: false,
        isFetching: false,
        isLoading: false,
        isError: false,
        isCanceled: false,
        isSuccess: true,
        isFinished: true,
        error: null,
        result: { title: 'Title' },
        payload: defaultPayload.payload,
      });
    });

    it('should throw error if status is invalid', () => {
      expect(() => generateRequestMetadata(defaultPayload)).toThrowError('Request status is invalid');
    });
  });

  describe('checkIfStoreRequestExist', () => {
    const defaultPayload = {
      requests: {},
      request: 'getStore',
      key: 'default',
    };

    it('should return false if returned value is not an object', () => {
      expect(checkIfStoreRequestExist(defaultPayload)).toStrictEqual(false);

      expect(checkIfStoreRequestExist({
        ...defaultPayload, requests: { getStore: {} },
      })).toStrictEqual(false);

      expect(checkIfStoreRequestExist({
        ...defaultPayload, requests: { get: { default: {} } },
      })).toStrictEqual(false);

      expect(checkIfStoreRequestExist({
        ...defaultPayload, requests: { getStore: { InvalidDefault: {} } },
      })).toStrictEqual(false);

      expect(checkIfStoreRequestExist({
        ...defaultPayload, requests: { getStore: { InvalidDefault: [] } },
      })).toStrictEqual(false);

      expect(checkIfStoreRequestExist({
        ...defaultPayload, requests: { getStore: [] },
      })).toStrictEqual(false);
    });

    it('should throw error if requests is not an object', () => {
      expect(() => checkIfStoreRequestExist({ ...defaultPayload, requests: false })).toThrowError('Requests should be an object');
    });

    it('should return true is returned value is an object', () => {
      expect(checkIfStoreRequestExist({
        ...defaultPayload, requests: { getStore: { default: {} } },
      })).toStrictEqual(true);
    });
  });
});
