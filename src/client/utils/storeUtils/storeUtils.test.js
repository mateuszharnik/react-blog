import { valuesConstants } from '@shared/constants';
import { generateEventMetadata, checkIfStoreEventExist } from './index';

const { API_STATUSES } = valuesConstants;

describe('storeUtils', () => {
  describe('generateEventMetadata', () => {
    const defaultPayload = {
      status: 'INVALID',
      error: 'Error',
      data: { title: 'Title' },
    };

    it(`should return correct object for status '${API_STATUSES.TRIGGERED}'`, () => {
      expect(generateEventMetadata({
        ...defaultPayload,
        status: API_STATUSES.TRIGGERED,
      })).toMatchObject({
        isIdle: true,
        isFetching: false,
        isLoading: true,
        isError: false,
        isSuccess: false,
        isFinished: false,
        error: '',
        data: null,
      });
    });

    it(`should return correct object for status '${API_STATUSES.FETCHING}'`, () => {
      expect(generateEventMetadata({
        ...defaultPayload,
        status: API_STATUSES.FETCHING,
      })).toMatchObject({
        isIdle: false,
        isFetching: true,
        isLoading: true,
        isError: false,
        isSuccess: false,
        isFinished: false,
        error: '',
        data: null,
      });
    });

    it(`should return correct object for status '${API_STATUSES.ERROR}'`, () => {
      expect(generateEventMetadata({
        ...defaultPayload,
        status: API_STATUSES.ERROR,
      })).toMatchObject({
        isIdle: false,
        isFetching: false,
        isLoading: false,
        isError: true,
        isSuccess: false,
        isFinished: true,
        error: 'Error',
        data: null,
      });
    });

    it(`should return correct object for status '${API_STATUSES.SUCCESS}'`, () => {
      expect(generateEventMetadata({
        ...defaultPayload,
        status: API_STATUSES.SUCCESS,
      })).toMatchObject({
        isIdle: false,
        isFetching: false,
        isLoading: false,
        isError: false,
        isSuccess: true,
        isFinished: true,
        error: '',
        data: { title: 'Title' },
      });
    });

    it('should throw error if status is invalid', () => {
      expect(() => generateEventMetadata(defaultPayload)).toThrowError('Event status is invalid');
    });
  });

  describe('checkIfStoreEventExist', () => {
    const defaultPayload = {
      events: {},
      event: 'getStore',
      key: 'default',
    };

    it('should return false if returned value is not an object', () => {
      expect(checkIfStoreEventExist(defaultPayload)).toStrictEqual(false);

      expect(checkIfStoreEventExist({
        ...defaultPayload, events: { getStore: {} },
      })).toStrictEqual(false);

      expect(checkIfStoreEventExist({
        ...defaultPayload, events: { get: { default: {} } },
      })).toStrictEqual(false);

      expect(checkIfStoreEventExist({
        ...defaultPayload, events: { getStore: { InvalidDefault: {} } },
      })).toStrictEqual(false);

      expect(checkIfStoreEventExist({
        ...defaultPayload, events: { getStore: { InvalidDefault: [] } },
      })).toStrictEqual(false);

      expect(checkIfStoreEventExist({
        ...defaultPayload, events: { getStore: [] },
      })).toStrictEqual(false);
    });

    it('should throw error if events is not an object', () => {
      expect(() => checkIfStoreEventExist({ ...defaultPayload, events: false })).toThrowError('Events should be an object');
    });

    it('should return true is returned value is an object', () => {
      expect(checkIfStoreEventExist({
        ...defaultPayload, events: { getStore: { default: {} } },
      })).toStrictEqual(true);
    });
  });
});
