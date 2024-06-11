import { render, screen } from '@testing-library/react';

import { Text } from './Text';

describe('Text', () => {
  const text = 'i am text children';

  it('должен рендерить заголовок с элементом children внутри', () => {
    render(<Text>{text}</Text>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it.each([
    { className: 'one' },
    { className: 'two' },
    { className: 'three' }
  ])('должен рендерить текст с заданным классом $className', ({ className }) => {
    render(<Text className={className}>{text}</Text>);

    const element = screen.getByText(text);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(className);
    expect(element).toHaveClass('text');
  });

  it('если isError класс error добавлися с элемент', () => {
    render(<Text isError={true}>{text}</Text>);

    const element = screen.getByText(text);

    expect(element).toHaveClass('error');
  });

  it('если isSuccess класс success добавлися с элемент', () => {
    render(<Text isSuccess={true}>{text}</Text>);

    const element = screen.getByText(text);

    expect(element).toHaveClass('success');
  });
});