import { screen } from '@testing-library/react';

import { renderWithRouter } from '../../testUtils/routerProvider';
import { CategoryItem } from '../CategoryItem';

describe('CategoryItem', () => { 
  it('рендер компонента', () => {
    renderWithRouter(<CategoryItem strCategory="Cheese" strCategoryThumb="123" strCategoryDescription="/meal.png"/>);

    expect(screen.getByRole('article')).toMatchSnapshot();
  });
});