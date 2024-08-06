import PrivateAPIService from '@client/services/apiService/private/privateAPIService';

export class PrivateAboutAPIService extends PrivateAPIService {
  updateAbout = (payload, options) => this.client.put('', payload, options);
}
