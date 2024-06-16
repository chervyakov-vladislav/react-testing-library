import { screen, render } from '@testing-library/react';

import { NotFound } from '../NotFound';

describe('NotFound', () => { 
  it('рендер NotFound', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading')).toMatchSnapshot();
  });
});