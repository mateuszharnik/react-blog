import PrivateAPIService from '@client/services/apiService/private/privateAPIService';
import { apiConstants } from '@shared/constants';

export class PrivateUsersAPIService extends PrivateAPIService {
  getMe = (options) => this.client.get(apiConstants.USERS.ME.ROOT, options);
}
