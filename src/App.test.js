import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Front Test Title', () => {
  render(<App />);
  const linkElement = screen.getByText("Front Test");
  expect(linkElement).toBeInTheDocument();
});
