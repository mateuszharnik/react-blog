import PublicAPIService from '@client/services/apiService/public/publicAPIService';

export class PublicAboutAPIService extends PublicAPIService {
  getAbout = (options) => this.client.get('', options);
}
