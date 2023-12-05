import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Login from '@/app/login/page';
import { Provider } from 'react-redux';
import store from '@/redux-store/store';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
  }),
}));

describe('Login', () => {
  it('renders a page correctly', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const login = screen.getByText('Login');
    const email = screen.getByPlaceholderText('Your email');
    const password = screen.getByPlaceholderText('Your password');
    expect(login).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });



});