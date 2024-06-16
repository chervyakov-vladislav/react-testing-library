import { screen } from '@testing-library/react';

import { renderWithRouter } from '../../testUtils/routerProvider';
import { CategoryList } from '../CategoryList';

describe('CategoryList', () => { 
  it('рендер компонента без содержимого', () => {
    renderWithRouter(<CategoryList />);

    expect(screen.getByRole('list')).toMatchSnapshot();
  });

  it('рендер компонента с дочерними элементами', () => {
    renderWithRouter(<CategoryList catalog={[
      {
        idCategory: 1,
        strCategory: 'sadasdasd',
        strCategoryThumb: 'adasdasd',
        strCategoryDescription: 'asdadsasd'
      },
      {
        idCategory: 2,
        strCategory: 'asdasdasd',
        strCategoryThumb: 'asdasda',
        strCategoryDescription: 'asdasdasd'
      }
    ]} />);

    expect(screen.getByRole('list')).toMatchSnapshot();
  });
});