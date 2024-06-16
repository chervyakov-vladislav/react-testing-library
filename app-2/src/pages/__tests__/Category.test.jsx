import { screen, waitForElementToBeRemoved } from '@testing-library/react';

import { Category } from '../Category';
import { renderWithRouter } from '../../testUtils/routerProvider';
import * as api from '../../api';

const apiSpy = jest.spyOn(api, 'getFilteredCategory');

describe('Category', () => {
  it('рендер с полученными данными', async () => {
    apiSpy.mockResolvedValueOnce({
      meals: [
        {
          idMeal: '1',
          strMeal: 'First',
          strMealThumb: 'Thumb',
        },
        {
          idMeal: '2',
          strMeal: 'Second',
          strMealThumb: 'Thumb',
        },
      ],
    });

    renderWithRouter(<Category />);

    const preloader = screen.getByRole('progressbar');

    expect(preloader).toBeInTheDocument();

    await waitForElementToBeRemoved(preloader);

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('рендер элементов, когда данных в ответе нет', async () => {
    apiSpy.mockResolvedValueOnce({ meals: [] });

    renderWithRouter(<Category />);

    const preloader = await screen.findByRole('progressbar');
    const button = await screen.findByRole('button', { name: /go back/i });

    expect(preloader).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
