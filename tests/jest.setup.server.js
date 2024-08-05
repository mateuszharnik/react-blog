import '../scripts/tests';
import db from '@server/db';
import cleanDB from '@server/seeds/cleanDB';

beforeAll(() => cleanDB());

afterAll(() => db.close());
