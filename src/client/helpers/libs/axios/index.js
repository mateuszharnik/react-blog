import { create } from 'axios';

const axios = create({
  baseURL: '/api/v1/',
});

// TODO: Create apiClient for axios
export default axios;
