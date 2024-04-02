import { Types } from 'mongoose';
import db from '@server/db';
import cleanDB from '@server/seeds/cleanDB';
import TermsOfUse from './index';

describe('TermsOfUse Model', () => {
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
      const termsOfUse = new TermsOfUse({});

      await termsOfUse.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: contents: Path `contents` is required., name: Path `name` is required.');
  });

  it('should return validation error if we pass object with incorrect types of props', async () => {
    let error = null;

    try {
      const termsOfUse = new TermsOfUse({
        name: {},
        contents: {},
      });

      await termsOfUse.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: name: Cast to string failed for value "{}" (type Object) at path "name", contents: Cast to string failed for value "{}" (type Object) at path "contents"');
  });

  it('should return validation error if we pass to long name and contents', async () => {
    let error = null;

    try {
      const termsOfUse = new TermsOfUse({
        name: new Array(102 + 1).join('a'),
        contents: new Array(20002 + 1).join('b'),
      });

      await termsOfUse.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toMatchSnapshot();
  });

  it('should return validation error if we pass to short name and contents', async () => {
    let error = null;

    try {
      const termsOfUse = new TermsOfUse({
        name: 'a',
        contents: 'b',
      });

      await termsOfUse.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toMatchSnapshot();
  });

  it('should return validation error if we pass object without `contents` prop', async () => {
    let error = null;

    try {
      const termsOfUse = new TermsOfUse({
        name: 'Test',
      });

      await termsOfUse.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: contents: Path `contents` is required.');
  });

  it('should return validation error if we pass object without `name` prop', async () => {
    let error = null;

    try {
      const termsOfUse = new TermsOfUse({
        contents: 'Test',
      });

      await termsOfUse.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: name: Path `name` is required.');
  });

  it('should create terms of use with expected values if we pass object with props not defined in model', async () => {
    const termsOfUse = await TermsOfUse.create({
      name: 'Test',
      contents: 'Test',
      abc: 21,
      def: true,
      ghi: 'test',
    });

    expect(termsOfUse).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      name: 'Test',
      contents: 'Test',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));

    expect(termsOfUse).not.toHaveProperty('abc');
    expect(termsOfUse).not.toHaveProperty('def');
    expect(termsOfUse).not.toHaveProperty('ghi');
  });

  it('should create terms of use if we pass object without optional props', async () => {
    const termsOfUse = await TermsOfUse.create({
      name: 'Test',
      contents: 'Test',
    });

    expect(termsOfUse).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      name: 'Test',
      contents: 'Test',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });

  it('should create terms of use if we pass valid object', async () => {
    const termsOfUse = await TermsOfUse.create({
      _id: new Types.ObjectId(),
      name: 'Test',
      contents: 'Test',
      deleted_at: null,
      updated_at: new Date(),
      created_at: new Date(),
    });

    expect(termsOfUse).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      name: 'Test',
      contents: 'Test',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });
});
