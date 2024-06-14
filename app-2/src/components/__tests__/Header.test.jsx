import { screen } from '@testing-library/react';

import { Header } from '../Header';

import { renderWithRouter } from '../../testUtils/routerProvider';

describe('Header', () => {
  it('отрисовка хедера', () => {
    renderWithRouter(<Header />);

    const element = screen.getByText(/react food/i);
    const links = screen.getAllByRole('link');

    expect(element).toBeInTheDocument();
    expect(links).toHaveLength(3);
  })
});