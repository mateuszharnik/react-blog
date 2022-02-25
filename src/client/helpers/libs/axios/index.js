import { create } from 'axios';

const axios = create({
  baseURL: '/api/v1/',
});

export default axios;
