import { screen, render } from '@testing-library/react';

import { About } from '../About';

describe('About', () => { 
  it('рендер About', () => {
    render(<About />);

    expect(screen.getByRole('heading')).toMatchSnapshot();
  });
});