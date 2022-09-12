import '@server/db';
import cleanDB from '@server/seeds/cleanDB';
import defaultData from './defaultData';

const data = {
  default: defaultData,
};

export const loadData = async (name) => {
  const result = data[name] ? await data[name]() : await data.default();

  return result;
};

export const clean = async () => {
  await cleanDB();
};
