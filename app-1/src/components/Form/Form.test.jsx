import { render, fireEvent, waitFor } from '@testing-library/react';

import { Form } from './Form';

describe('Form', () => {
  it('должна отприсовываться форма с children', () => {
    const { container, getByTestId } = render(
      <Form>
        <div data-testid="inner-div"></div>
      </Form>
    );

    expect(getByTestId('inner-div')).toBeInTheDocument();
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('onSubmit вызывается', () => {
    const onSubmit = jest.fn();

    const { container } = render(<Form onSubmit={onSubmit}/>)
    const myForm = container.querySelector('form');

    fireEvent.submit(myForm);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('должна вызываться функция onSuccess', async () => {
    const onSuccess = jest.fn();

    const { container } = render(<Form onSuccess={onSuccess} onSubmit={jest.fn()}/>);
    const myForm = container.querySelector('form');

    fireEvent.submit(myForm);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('должна вызываться функция onError', async () => {
    const onError = jest.fn();

    const { container } = render(<Form onError={onError} onSubmit={() => Promise.reject()}/>);
    const myForm = container.querySelector('form');

    fireEvent.submit(myForm);

    await waitFor(() => {
      expect(onError).toHaveBeenCalledTimes(1);
    });
  });
});