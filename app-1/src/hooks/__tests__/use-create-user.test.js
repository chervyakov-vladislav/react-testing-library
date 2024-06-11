import { renderHook, act } from '@testing-library/react';

import { useCreateUser } from '../use-create-user';
import { passwordValidationErrors } from '../../constants/validation';

describe('useCreateUser', () => {
  it('возвращает объект с набором полей - successMessage, errorMessage, onSubmit, onSuccess, onError', () => {
    const { result } = renderHook(() => useCreateUser());

    expect(result.current).toHaveProperty('successMessage');
    expect(result.current).toHaveProperty('errorMessage');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('onSuccess');
    expect(result.current).toHaveProperty('onError');

    expect(typeof result.current.successMessage).toBe('string');
    expect(typeof result.current.errorMessage).toBe('string');
    expect(typeof result.current.onSubmit).toBe('function');
    expect(typeof result.current.onSuccess).toBe('function');
    expect(typeof result.current.onError).toBe('function');
  });

  it('проверка появления successMessage', () => {
    const { result } = renderHook(useCreateUser);

    expect(result.current.successMessage).toBe('');

    act(() => {
      result.current.onSuccess({ name: 'Vova', password: 'Qwerty123!' });
    });

    expect(result.current.successMessage).toBe(
      `User Vova created with password Qwerty123!`,
    );
  });

  it('проверка появления errorMessage', () => {
    const { result } = renderHook(useCreateUser);

    expect(result.current.errorMessage).toBe('');

    act(() => {
      result.current.onError(new Error('error'));
    });

    expect(result.current.errorMessage).toBe('error');
  });

  it('проверка появления ошибки при валидации', async () => {
    const { result } = renderHook(useCreateUser);

    const promiseReject = result.current.onSubmit({ password: '123' });

    await expect(promiseReject).rejects.toThrow(
      passwordValidationErrors.length,
    );
  });

  it('проверка правильной валидации сложного пароля', async () => {
    const { result } = renderHook(useCreateUser);

    const promiseResolve = result.current.onSubmit({ password: 'Qwerty132!' });

    await expect(promiseResolve).resolves.toBe();
  });
});
