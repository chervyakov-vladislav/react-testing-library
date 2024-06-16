import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from '../../testUtils/routerProvider';
import * as api from '../../api';

import { Home } from '../Home';

const apiSpy = jest.spyOn(api, 'getAllCategories');

const categories = [
  {
    strCategory: 'First',
    idCategory: '1',
    strCategoryThumb: 'Thumb',
    strCategoryDescription: 'Description',
  },
  {
    strCategory: 'Second',
    idCategory: '2',
    strCategoryThumb: 'Thumb',
    strCategoryDescription: 'Description',
  },
  {
    strCategory: 'Third',
    idCategory: '3',
    strCategoryThumb: 'Thumb',
    strCategoryDescription: 'Description',
  },
];

describe('Home', () => {
  it('рендер страницы', async () => {
    apiSpy.mockResolvedValueOnce({ categories });

    renderWithRouter(<Home />);

    const preloader = screen.getByRole('progressbar');

    expect(preloader).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();

    await waitForElementToBeRemoved(preloader);

    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('рендер с квери параметром', async () => {
    apiSpy.mockResolvedValueOnce({ categories });

    renderWithRouter(<Home />, {
      initialEntries: ['/?search=first'],
    });

    const preloader = screen.getByRole('progressbar');

    expect(preloader).toBeInTheDocument();

    await waitForElementToBeRemoved(preloader);

    expect(screen.getAllByRole('article')).toHaveLength(1);
  });

  it('рендер странцы и взаимодействие пользователя', async () => {
    apiSpy.mockResolvedValue({ categories });

    renderWithRouter(<Home />);

    const preloader = screen.getByRole('progressbar');
    const input = screen.getByRole('searchbox');

    expect(preloader).toBeInTheDocument();

    await waitForElementToBeRemoved(preloader);

    expect(screen.getAllByRole('article')).toHaveLength(3);

    await userEvent.type(input, 'first');
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
});
