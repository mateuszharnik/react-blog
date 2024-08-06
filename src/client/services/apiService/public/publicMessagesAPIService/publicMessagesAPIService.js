import PublicAPIService from '@client/services/apiService/public/publicAPIService';

export class PublicMessagesAPIService extends PublicAPIService {
  createMessage = (payload, options) => this.client.post('', payload, options);
}
