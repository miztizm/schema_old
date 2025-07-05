import { create, test, enforce } from 'vest';

export const authFormSuite = create('auth_form', (data = {}) => {
  test('email', 'Email is required', () => {
    enforce(data.email).isNotBlank();
  });

  test('email', 'Invalid email format', () => {
    enforce(data.email).matches(/^\S+@\S+\.\S+$/);
  });

  test('password', 'Password is required', () => {
    enforce(data.password).isNotBlank();
  });
});
