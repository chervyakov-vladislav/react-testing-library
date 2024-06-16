import { screen } from '@testing-library/react';

import { renderWithRouter } from '../../testUtils/routerProvider';
import { Meal } from '../Meal';

describe('Meal', () => { 
  it('рендер компонента', () => {
    renderWithRouter(<Meal strMeal="Cheese" idMeal="123" strMealThumb="/meal.png"/>);

    expect(screen.getByRole('article')).toMatchSnapshot();
  });
});