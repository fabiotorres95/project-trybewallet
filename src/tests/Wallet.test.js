import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const goodEmail = 'bob@bob.bob';

describe('Wallet page tests', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
    const loginEmail = screen.getByTestId('email-input');
    const loginPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button');

    userEvent.type(loginEmail, goodEmail);
    userEvent.type(loginPassword, 'xablau');
    userEvent.click(loginButton);
  });

  it('check if all header elements exist', () => {
    const email = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const headerCurrency = screen.getByTestId('header-currency-field');

    expect(email).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(headerCurrency).toBeInTheDocument();
    expect(email).toHaveTextContent(goodEmail);
    expect(total).toHaveTextContent(0.00);
    expect(headerCurrency).toHaveTextContent('BRL');
  });

  it('check if all form elements exist', () => {
    const valueInput = screen.getByTestId('value-input');
    const descInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const formButton = screen.getByText('Adicionar despesa');

    expect(valueInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
  });

  it('check if all currencies are in the currency input form', async () => {
    const currencyInput = await screen.findByTestId('currency-input');
    const optionUsd = await screen.findByDisplayValue('USD');
    const optionDoge = await screen.findByDisplayValue('DOGE');

    expect(currencyInput).toContainElement(optionUsd);
    expect(currencyInput).toContainElement(optionDoge);
  });
});
