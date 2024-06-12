import { screen, fireEvent } from '@testing-library/react';

import App from './App';

import * as waitMock from './helpers/wait';
import { renderWithProviders } from './utils/renderWithProviders';

const waitSpy = jest.spyOn(waitMock, 'wait');

describe('App', () => {
  it('should render App with form elements and a title', () => {
    renderWithProviders(<App />);

    expect(screen.getByTestId('app')).toBeInTheDocument();

    const userNameInput = screen.getByLabelText(/User name/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { name: /Create user/ });
    const title = screen.getByRole('heading', {
      level: 1,
      name: /Create user/,
    });

    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it('should render error message when form was submit with a weak password', async () => {
    renderWithProviders(<App />);

    const userNameInput = screen.getByLabelText(/User name/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { name: /Create user/ });

    const successMessage = screen.queryByText(/created with password/);
    const errorMessage = screen.queryByText(
      /Password must be at least 8 characters long/,
    );

    expect(successMessage).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();

    fireEvent.change(userNameInput, { target: { value: 'John' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    const errorMessageAfterSubmit = await screen.findByText(
      /Password must be at least 8 characters long/,
    );
    expect(errorMessageAfterSubmit).toBeInTheDocument();
  });

  it('should render success message after successful submit', async () => {
    renderWithProviders(<App />);

    const userNameInput = screen.getByLabelText(/User name/);
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button', { name: /Create user/ });

    const successMessage = screen.queryByText(/created with password/);
    const errorMessage = screen.queryByText(
      /Password must be at least 8 characters long/,
    );

    expect(successMessage).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();

    const promise = Promise.resolve();

    waitSpy.mockImplementationOnce(() => promise);

    fireEvent.change(userNameInput, { target: { value: 'John' } });
    fireEvent.change(passwordInput, { target: { value: 'Qwer3212@1@' } });
    fireEvent.click(submitButton);

    const successMessageAfterSubmit = await screen.findByText(
      /created with password/,
    );
    expect(successMessageAfterSubmit).toBeInTheDocument();
  });
});
