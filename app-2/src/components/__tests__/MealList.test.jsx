import { screen } from '@testing-library/react';

import { renderWithRouter } from '../../testUtils/routerProvider';
import { MealList } from '../MealList';

describe('MealList', () => { 
  it('рендер компонента', () => {
    const listProps = [
      {
        strMeal: 'Cheese',
        idMeal: '1',
        strMealThumb: '/meal.png',
      },
      {
        strMeal: 'meat',
        idMeal: '2',
        strMealThumb: '/meal.png',
      }
    ] 

    renderWithRouter(<MealList meals={listProps}/>);

    expect(screen.getByRole('list')).toMatchSnapshot();
  });
});