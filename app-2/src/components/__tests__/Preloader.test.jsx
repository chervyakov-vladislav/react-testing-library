import { screen, render } from '@testing-library/react';

import { Preloader } from '../Preloader';

describe('Preloader', () => {
  it(('рендер прелоадера'), () => {
    render(<Preloader />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveClass('progress');
    expect(screen.getByRole('progressbar')).toMatchSnapshot();
  });
});