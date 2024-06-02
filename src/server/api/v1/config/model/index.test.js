import { Types } from 'mongoose';
import db from '@server/db';
import cleanDB from '@server/seeds/cleanDB';
import Config from './index';

describe('Config Model', () => {
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
      const config = new Config({});

      await config.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: use_docs_password: Path `use_docs_password` is required., use_slug_url: Path `use_slug_url` is required., show_comments: Path `show_comments` is required., show_social_media: Path `show_social_media` is required., show_email: Path `show_email` is required., show_authors: Path `show_authors` is required.');
  });

  it('should return validation error if we pass object with incorrect types of props', async () => {
    let error = null;

    try {
      const config = new Config({
        show_authors: 21,
        show_email: 21,
        show_social_media: 21,
        show_comments: 21,
        use_slug_url: 21,
        use_docs_password: 21,
      });

      await config.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: show_authors: Cast to Boolean failed for value "21" (type number) at path "show_authors" because of "CastError", show_email: Cast to Boolean failed for value "21" (type number) at path "show_email" because of "CastError", show_social_media: Cast to Boolean failed for value "21" (type number) at path "show_social_media" because of "CastError", show_comments: Cast to Boolean failed for value "21" (type number) at path "show_comments" because of "CastError", use_slug_url: Cast to Boolean failed for value "21" (type number) at path "use_slug_url" because of "CastError", use_docs_password: Cast to Boolean failed for value "21" (type number) at path "use_docs_password" because of "CastError"');
  });

  it('should return validation error if we pass object without `show_authors` prop', async () => {
    let error = null;

    try {
      const config = new Config({
        show_email: true,
        show_social_media: true,
        show_comments: true,
        use_slug_url: true,
        use_docs_password: true,
      });

      await config.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: show_authors: Path `show_authors` is required.');
  });

  it('should return validation error if we pass object without `show_email` prop', async () => {
    let error = null;

    try {
      const config = new Config({
        show_authors: true,
        show_social_media: true,
        show_comments: true,
        use_slug_url: true,
        use_docs_password: true,
      });

      await config.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: show_email: Path `show_email` is required.');
  });

  it('should return validation error if we pass object without `show_social_media` prop', async () => {
    let error = null;

    try {
      const config = new Config({
        show_authors: true,
        show_email: true,
        show_comments: true,
        use_slug_url: true,
        use_docs_password: true,
      });

      await config.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: show_social_media: Path `show_social_media` is required.');
  });

  it('should return validation error if we pass object without `show_comments` prop', async () => {
    let error = null;

    try {
      const config = new Config({
        show_authors: true,
        show_social_media: true,
        show_email: true,
        use_slug_url: true,
        use_docs_password: true,
      });

      await config.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: show_comments: Path `show_comments` is required.');
  });

  it('should return validation error if we pass object without `use_slug_url` prop', async () => {
    let error = null;

    try {
      const config = new Config({
        show_authors: true,
        show_social_media: true,
        show_comments: true,
        show_email: true,
        use_docs_password: true,
      });

      await config.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: use_slug_url: Path `use_slug_url` is required.');
  });

  it('should return validation error if we pass object without `use_docs_password` prop', async () => {
    let error = null;

    try {
      const config = new Config({
        show_authors: true,
        show_social_media: true,
        show_comments: true,
        show_email: true,
        use_slug_url: true,
      });

      await config.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: use_docs_password: Path `use_docs_password` is required.');
  });

  it('should create config with expected values if we pass object with props not defined in model', async () => {
    const config = await Config.create({
      show_authors: true,
      show_social_media: true,
      show_comments: true,
      show_email: true,
      use_slug_url: true,
      use_docs_password: true,
      abc: 21,
      def: true,
      ghi: 'test',
    });

    expect(config).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      show_authors: true,
      show_social_media: true,
      show_comments: true,
      show_email: true,
      use_slug_url: true,
      use_docs_password: true,
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));

    expect(config).not.toHaveProperty('abc');
    expect(config).not.toHaveProperty('def');
    expect(config).not.toHaveProperty('ghi');
  });

  it('should create config if we pass object without optional props', async () => {
    const config = await Config.create({
      show_authors: true,
      show_social_media: true,
      show_comments: true,
      show_email: true,
      use_slug_url: true,
      use_docs_password: true,
    });

    expect(config).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      show_authors: true,
      show_social_media: true,
      show_comments: true,
      show_email: true,
      use_slug_url: true,
      use_docs_password: true,
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });

  it('should create config if we pass valid object', async () => {
    const config = await Config.create({
      _id: new Types.ObjectId(),
      show_authors: true,
      show_social_media: true,
      show_comments: true,
      show_email: true,
      use_slug_url: true,
      use_docs_password: true,
      deleted_at: null,
      updated_at: new Date(),
      created_at: new Date(),
    });

    expect(config).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      show_authors: true,
      show_social_media: true,
      show_comments: true,
      show_email: true,
      use_slug_url: true,
      use_docs_password: true,
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });
});
