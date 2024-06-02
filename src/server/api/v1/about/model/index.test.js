import { Types } from 'mongoose';
import db from '@server/db';
import cleanDB from '@server/seeds/cleanDB';
import markdownToHTML from '@server/helpers/markdownToHTML';
import About from './index';

describe('About Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.close();
  });

  beforeAll(async () => {
    await cleanDB();
  });

  it('should return validation error if we pass object with incorrect types of props', async () => {
    let error = null;

    try {
      const about = new About({
        contents: {},
        html_contents: {},
      });

      await about.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: contents: Cast to string failed for value "{}" (type Object) at path "contents", html_contents: Cast to string failed for value "{}" (type Object) at path "html_contents"');
  });

  it('should return validation error if we pass to long contents', async () => {
    let error = null;

    try {
      const about = new About({
        contents: new Array(20002 + 1).join('a'),
        html_contents: markdownToHTML(new Array(20002 + 1).join('a')),
      });

      await about.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toMatchSnapshot();
  });

  it('should create about with expected values if we pass object with props not defined in model', async () => {
    const about = await About.create({
      contents: '',
      html_contents: '',
      abc: 21,
      def: true,
      ghi: 'test',
    });

    expect(about).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      contents: '',
      html_contents: '',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));

    expect(about).not.toHaveProperty('abc');
    expect(about).not.toHaveProperty('def');
    expect(about).not.toHaveProperty('ghi');
  });

  it('should create about if we pass object without optional props', async () => {
    const about = await About.create({});

    expect(about).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      contents: '',
      html_contents: '',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });

  it('should create about if we pass valid object', async () => {
    const about = await About.create({
      _id: new Types.ObjectId(),
      contents: '',
      html_contents: '',
      deleted_at: null,
      updated_at: new Date(),
      created_at: new Date(),
    });

    expect(about).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      contents: '',
      html_contents: '',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });
});
