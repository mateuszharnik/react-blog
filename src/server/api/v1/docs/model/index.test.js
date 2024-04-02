import { Types } from 'mongoose';
import db from '@server/db';
import cleanDB from '@server/seeds/cleanDB';
import Docs from './index';

describe('Docs Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.close();
  });

  beforeAll(async () => {
    await cleanDB();
  });

  it('should return validation error if we pass empty object', async () => {
    let error = null;

    try {
      const docs = new Docs({});

      await docs.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: password: Path `password` is required.');
  });

  it('should return validation error if we pass object with incorrect types of props', async () => {
    let error = null;

    try {
      const docs = new Docs({
        password: {},
      });

      await docs.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: password: Cast to string failed for value "{}" (type Object) at path "password"');
  });

  it('should create docs with expected values if we pass object with props not defined in model', async () => {
    const docs = await Docs.create({
      password: 'test',
      abc: 21,
      def: true,
      ghi: 'test',
    });

    expect(docs).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      password: 'test',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));

    expect(docs).not.toHaveProperty('abc');
    expect(docs).not.toHaveProperty('def');
    expect(docs).not.toHaveProperty('ghi');
  });

  it('should create docs if we pass object without optional props', async () => {
    const docs = await Docs.create({
      password: 'test',
    });

    expect(docs).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      password: 'test',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });

  it('should create docs if we pass valid object', async () => {
    const docs = await Docs.create({
      _id: new Types.ObjectId(),
      password: 'test',
      deleted_at: null,
      updated_at: new Date(),
      created_at: new Date(),
    });

    expect(docs).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      password: 'test',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });
});
