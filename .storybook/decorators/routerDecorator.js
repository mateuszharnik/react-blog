import { MemoryRouter as Router } from 'react-router-dom';

export const routerDecorator = (Story) => (
  <Router basename={process.env.BASE_URL}>
    <Story />
  </Router>
);
