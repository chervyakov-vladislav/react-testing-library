import { fireEvent, screen, waitFor } from '@testing-library/react';

import { Form } from './Form';
import { renderWithProviders } from '../../utils/renderWithProviders';

describe('Form', () => {
  it('должна отприсовываться форма с children', () => {
    renderWithProviders(
      <Form>
        <div data-testid="inner-div"></div>
      </Form>
    );

    expect(screen.getByTestId('inner-div')).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('onSubmit вызывается', () => {
    const onSubmit = jest.fn();

    renderWithProviders(<Form onSubmit={onSubmit} />);

    const myForm = screen.getByRole('form');

    fireEvent.submit(myForm);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('должна вызываться функция onSuccess', async () => {
    const onSuccess = jest.fn();

    renderWithProviders(<Form onSubmit={jest.fn()} onSuccess={onSuccess} />);

    const myForm = screen.getByRole('form');

    fireEvent.submit(myForm);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('должна вызываться функция onError', async () => {
    const onError = jest.fn();

    renderWithProviders(
      <Form onSubmit={() => Promise.reject()} onError={onError} />,
    );

    const myForm = screen.getByRole('form');

    fireEvent.submit(myForm);

    await waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });
});
