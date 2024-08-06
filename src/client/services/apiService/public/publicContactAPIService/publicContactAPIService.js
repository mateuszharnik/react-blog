import PublicAPIService from '@client/services/apiService/public/publicAPIService';

export class PublicContactAPIService extends PublicAPIService {
  getContact = (options) => this.client.get('', options);
}
