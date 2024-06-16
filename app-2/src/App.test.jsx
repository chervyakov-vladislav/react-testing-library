import { screen } from '@testing-library/react';

import { renderWithRouter } from './testUtils/routerProvider';

import App from './App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));
jest.mock('./pages/Home', () => ({
  Home: () => <div data-testid="home">Home</div>,
}));
jest.mock('./pages/About', () => ({
  About: () => <div data-testid="about">About</div>,
}));
jest.mock('./pages/Contact', () => ({
  Contact: () => <div data-testid="contact">Contact</div>,
}));
jest.mock('./pages/Category', () => ({
  Category: () => <div data-testid="category">Category</div>,
}));
jest.mock('./pages/Recipe', () => ({
  Recipe: () => <div data-testid="recipe">Recipe</div>,
}));
jest.mock('./pages/NotFound', () => ({
  NotFound: () => <div data-testid="not-found">Not Found</div>,
}));

describe('App', () => {
  it('рендер главной страницы приложения', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  it('рендер страницы приложения с About', () => {
    renderWithRouter(<App />, { initialEntries: ['/about'] });

    expect(screen.getByTestId('about')).toBeInTheDocument();
  });

  it('рендер страницы приложения с Contact', () => {
    renderWithRouter(<App />, { initialEntries: ['/contacts'] });

    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });

  it('рендер страницы приложения с Category', () => {
    renderWithRouter(<App />, { initialEntries: ['/category/first'] });

    expect(screen.getByTestId('category')).toBeInTheDocument();
  });

  it('рендер страницы приложения с Recipe', () => {
    renderWithRouter(<App />, { initialEntries: ['/meal/1'] });

    expect(screen.getByTestId('recipe')).toBeInTheDocument();
  });

  it('рендер страницы приложения с NotFound', () => {
    renderWithRouter(<App />, { initialEntries: ['/not-found'] });

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
