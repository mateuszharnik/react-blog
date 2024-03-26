class ApiErrorModel extends Error {
  constructor(error) {
    super(error);

    this.errorKey = '';
  }
}

export default ApiErrorModel;
