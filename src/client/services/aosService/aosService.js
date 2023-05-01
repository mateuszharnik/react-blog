import aos from 'aos';

class AOSService {
  #client = null;

  constructor(client) {
    this.#client = client;
  }

  init() {
    this.#client.init({
      once: true,
    });
  }
}

export const aosService = new AOSService(aos);
