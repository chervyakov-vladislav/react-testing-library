import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search } from '../Search';

describe('Search', () => {
  it('отрисовка поиска', () => {
    render(<Search />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('меняетя значение у input при вводе данных', async () => {
    render(<Search />);

    const input = screen.getByRole('searchbox');
    const inputValue = 'chikichiki';

    await userEvent.type(input, inputValue);

    expect(input).toHaveValue(inputValue);
  });

  it('при введенных данных сабмититься форма по кнопке', async () => {
    const searchFn = jest.fn();
    render(<Search cb={searchFn} />);

    const input = screen.getByRole('searchbox');
    const inputValue = 'chikichiki';
    const submitButton = screen.getByRole('button');

    await userEvent.type(input, inputValue);
    await userEvent.click(submitButton);

    expect(searchFn).toHaveBeenCalledWith(inputValue);
    expect(searchFn).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue(inputValue);
  });

  it('при введенных данных сабмититься форма по enter', async () => {
    const searchFn = jest.fn();
    render(<Search cb={searchFn} />);

    const input = screen.getByRole('searchbox');
    const inputValue = 'chikichiki';

    await userEvent.type(input, `${inputValue}{enter}`);

    expect(searchFn).toHaveBeenCalledWith(inputValue);
    expect(searchFn).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue(inputValue);
  });
});