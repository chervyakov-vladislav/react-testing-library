import { screen, render } from '@testing-library/react';

import { Contact } from '../Contact';

describe('Contact', () => { 
  it('рендер Contact', () => {
    render(<Contact />);

    expect(screen.getByRole('heading')).toMatchSnapshot();
  });
});