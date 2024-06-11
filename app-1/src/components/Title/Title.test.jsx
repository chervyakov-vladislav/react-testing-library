import { render, screen } from '@testing-library/react';

import { Title } from './Title';

describe('Title', () => {
  const text = 'i am children';

  it('должен рендерить заголовок с элементом children внутри', () => {
    render(<Title>{text}</Title>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it.each([
    { level: 2, children: text },
    { level: 3, children: text },
    { level: 4, children: text } 
  ])
  (`должен рендирить h$level с элементом "$children" внутри`, ({ level }) => {
    const { container } = render(<Title level={level}>{text}</Title>);

    expect(container.querySelector(`h${level}`)).toBeInTheDocument();
  });

  it.each([
    { className: 'one' },
    { className: 'two' },
    { className: 'three' }
  ])('должен рендерить заголовок с заданным классом $className', ({ className }) => {
    render(<Title className={className}>{text}</Title>);

    const element = screen.getByText(text);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(className);
    expect(element).toHaveClass('title');
  });
});