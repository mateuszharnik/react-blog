import aos from 'aos';

class AOSService {
  constructor() {
    this.client = aos;
  }

  initAOS = () => {
    this.client.init({
      once: true,
    });
  };
}

const { client, initAOS } = new AOSService();

export const aosService = { ...client, initAOS };
