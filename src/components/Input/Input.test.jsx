import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './Input';

const testPlaceholder = 'test placeholder'

describe('Input', () => {
  it('должен отрисовать input', () => {
    render(<Input placeholder={testPlaceholder}/>);

    expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument();
  });

  it('должен отрисовать input с корректным типом элемента', () => {
    render(<Input placeholder={testPlaceholder} type='checkbox'/>);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('Корректно отображаются классы у элемента', () => {
    const { container} = render(
      <Input
        placeholder={testPlaceholder}
        inputClassName='inputTest'
        containerClassName='containerTest'
      />
    );

    const containerEl = container.querySelector('.formControl.containerTest');
    const element = screen.getByPlaceholderText(testPlaceholder);

    expect(containerEl).toBeInTheDocument();
    expect(element).toHaveClass('inputTest');
  });

  it('у интпута при рендере отсутствует label', () => {
    render(<Input placeholder={testPlaceholder}/>);

    expect(screen.queryByTestId('input-label')).not.toBeInTheDocument();
  });

  it('у интпута при рендере присутствует label', () => {
    const labelText = 'i am label';

    render(<Input placeholder={testPlaceholder} label={labelText}/>);

    expect(screen.getByLabelText(labelText)).toBeInTheDocument();
  });

  it('в интпут должно подставляться корректное value', () => {
    const value = 'value';

    render(<Input placeholder={testPlaceholder} value={value} onChange={jest.fn()}/>);

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it('Должна вызываться функция onChange', () => {
    const onChange = jest.fn();

    render(<Input placeholder={testPlaceholder} value="123" onChange={onChange}/>);

    const element = screen.getByPlaceholderText(testPlaceholder);

    fireEvent.change(element, { target: { value: '12344555' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('userEvent. Должна вызываться функция onChange', async () => {
    const onChange = jest.fn();

    render(<Input placeholder={testPlaceholder} onChange={onChange}/>);

    const element = screen.getByPlaceholderText(testPlaceholder);

    await userEvent.type(element, '1253');

    expect(onChange).toHaveBeenCalledTimes(4);
  });
});