import PublicAPIService from '@client/services/apiService/public/publicAPIService';

export class PublicConfigAPIService extends PublicAPIService {
  getConfig = (options) => this.client.get('', options);
}
