import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

const emailInput = 'email-input';
const passwordInput = 'password-input';

describe('Login page tests', () => {
  it('check if all of the necessary elements exist', () => {
    renderWithRouterAndRedux(<Login />);

    const login = screen.getByText('Login');
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button');

    expect(login).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('check if typing a good email and password enables button that was previously disabled', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button');

    expect(email).toHaveValue('');
    expect(password).toHaveValue('');
    expect(button).toHaveProperty('disabled', true);

    userEvent.type(email, 'bob@bob.bob');
    userEvent.type(password, 'xablau');

    expect(button).toHaveProperty('disabled', false);
  });

  it('check if on button click the page changes and email can be found in there', () => {
    const route = renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button');
    const goodEmail = 'bob@bob.bob';

    userEvent.type(email, goodEmail);
    userEvent.type(password, 'xablau');
    userEvent.click(button);

    expect(route.history.location.pathname).toBe('/carteira');

    const savedEmail = screen.getByText(goodEmail);

    expect(savedEmail).toBeInTheDocument();
  });
});
