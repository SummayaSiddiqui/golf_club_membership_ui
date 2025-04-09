import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Golf Club Membership heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /golf club membership/i });
  expect(heading).toBeInTheDocument();
});
