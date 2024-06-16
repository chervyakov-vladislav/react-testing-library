import { screen, render } from '@testing-library/react';

import { Footer } from '../Footer';

describe('Footer', () => {
  it('отрисовка футера', () => {
    render(<Footer />);

    expect(screen.getByText(/Copyright Text/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});