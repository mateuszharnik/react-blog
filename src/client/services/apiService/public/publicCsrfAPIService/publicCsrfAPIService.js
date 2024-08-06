import PublicAPIService from '@client/services/apiService/public/publicAPIService';

export class PublicCsrfAPIService extends PublicAPIService {
  getCSRFToken = (options) => this.client.get('', options);
}
