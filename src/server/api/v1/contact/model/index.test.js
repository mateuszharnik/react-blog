import { Types } from 'mongoose';
import db from '@server/db';
import cleanDB from '@server/seeds/cleanDB';
import Contact from './index';

describe('Contact Model', () => {
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
      const contact = new Contact({
        email: {},
        facebook_url: {},
        twitter_url: {},
        instagram_url: {},
        github_url: {},
      });

      await contact.validate();
    } catch (e) {
      error = e;
    }

    expect(error.toString()).toEqual('ValidationError: email: Cast to string failed for value "{}" (type Object) at path "email", facebook_url: Cast to string failed for value "{}" (type Object) at path "facebook_url", twitter_url: Cast to string failed for value "{}" (type Object) at path "twitter_url", instagram_url: Cast to string failed for value "{}" (type Object) at path "instagram_url", github_url: Cast to string failed for value "{}" (type Object) at path "github_url"');
  });

  it('should create contact with expected values if we pass object with props not defined in model', async () => {
    const contact = await Contact.create({
      email: 'test@test.pl',
      facebook_url: 'test',
      twitter_url: 'test',
      instagram_url: 'test',
      github_url: 'test',
      abc: 21,
      def: true,
      ghi: 'test',
    });

    expect(contact).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      email: 'test@test.pl',
      facebook_url: 'test',
      twitter_url: 'test',
      instagram_url: 'test',
      github_url: 'test',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));

    expect(contact).not.toHaveProperty('abc');
    expect(contact).not.toHaveProperty('def');
    expect(contact).not.toHaveProperty('ghi');
  });

  it('should create contact if we pass object without optional props', async () => {
    const contact = await Contact.create({});

    expect(contact).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      email: '',
      facebook_url: '',
      twitter_url: '',
      instagram_url: '',
      github_url: '',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });

  it('should create contact if we pass valid object', async () => {
    const contact = await Contact.create({
      _id: new Types.ObjectId(),
      email: 'test@test.pl',
      facebook_url: 'test',
      twitter_url: 'test',
      instagram_url: 'test',
      github_url: 'test',
      deleted_at: null,
      updated_at: new Date(),
      created_at: new Date(),
    });

    expect(contact).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      email: 'test@test.pl',
      facebook_url: 'test',
      twitter_url: 'test',
      instagram_url: 'test',
      github_url: 'test',
      deleted_at: null,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    }));
  });
});
