import { render, screen } from '@testing-library/react';
import App from './App';

// Ломается почему-то
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
