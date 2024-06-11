import {
  act,
  fireEvent,
  screen,
  render
} from '@testing-library/react';

import App from './App';

import * as waitMock from './helpers/wait';

const waitSpy = jest.spyOn(waitMock, 'wait');

describe('App', () => {
  it('должен рендериться компонент app с элементами и title', () => {
    const { container } = render(<App />);

    const userNameInput = screen.getByLabelText(/User name/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { name: /Create user/ });
    const title = container.querySelector('h1');

    expect(screen.getByTestId('app')).toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it('должно появляться сообщение об ошибке при отправке слабого пароля', async () => {
    render(<App />);

    const userNameInput = screen.getByLabelText(/User name/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { name: /Create user/ });

    const successMessage = screen.queryByText(/created with password/);
    const errorMessage = screen.queryByText(/Password must/);

    expect(successMessage).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();

    act(() => {
      fireEvent.change(userNameInput, { target: { value: 'Vasya' } });
      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.click(submitButton);
    });

    const errorMessageAfterSubmit = await screen.findByText(/Password must/);
    expect(errorMessageAfterSubmit).toBeInTheDocument();
  });

  it('должно рендериться сообщение о успешной отправке формы', async () => {
    render(<App />);

    const userNameInput = screen.getByLabelText(/User name/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { name: /Create user/ });

    const successMessage = screen.queryByText(/created with password/);
    const errorMessage = screen.queryByText(/Password must/);

    expect(successMessage).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();

    const successPromise = Promise.resolve();

    waitSpy.mockImplementationOnce(() => successPromise);

    act(() => {
      fireEvent.change(userNameInput, { target: { value: 'Vasya' } });
      fireEvent.change(passwordInput, { target: { value: 'Qwerty1@23!' } });
      fireEvent.click(submitButton);
    });

    const successMessageAfterSubmit = await screen.findByText(/created with password/);
    expect(successMessageAfterSubmit).toBeInTheDocument();
  });

  it('должно рендериться сообщение о неуспешной отправке формы, потом исправление данных на валидные и появление сообщения о успешной отправке данных', async () => {
    render(<App />);

    const userNameInput = screen.getByLabelText(/User name/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { name: /Create user/ });

    const successMessage = screen.queryByText(/created with password/);
    const errorMessage = screen.queryByText(/Password must/);

    expect(successMessage).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();

    act(() => {
      fireEvent.change(userNameInput, { target: { value: 'Vasya' } });
      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.click(submitButton);
    });

    const errorMessageAfterSubmit = await screen.findByText(/Password must/);
    expect(errorMessageAfterSubmit).toBeInTheDocument();
    expect(successMessage).not.toBeInTheDocument();

    const successPromise = Promise.resolve();
    waitSpy.mockImplementationOnce(() => successPromise);

    act(() => {
      fireEvent.change(userNameInput, { target: { value: 'Vasya' } });
      fireEvent.change(passwordInput, { target: { value: 'Qwerty1@23!' } });
      fireEvent.click(submitButton);
    });

    const successMessageAfterSubmit = await screen.findByText(/created with password/);
    expect(successMessageAfterSubmit).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });
});