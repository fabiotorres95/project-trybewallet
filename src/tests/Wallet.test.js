import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const goodEmail = 'bob@bob.bob';
const valueTestId = 'value-input';
const currencyTestId = 'currency-input';

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
    const valueInput = screen.getByTestId(valueTestId);
    const descInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId(currencyTestId);
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
    const currencyInput = await screen.findByTestId(currencyTestId);
    const optionUsd = await screen.findByDisplayValue('USD');
    // const optionDoge = await screen.findByDisplayValue('DOGE');

    expect(currencyInput).toContainElement(optionUsd);
    // expect(currencyInput).toContainElement(optionDoge);
  });

  it('check if filling the form creates a new row in the table', async () => {
    const valueInput = screen.getByTestId(valueTestId);
    const descInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId(currencyTestId);
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const formButton = screen.getByText('Adicionar despesa');

    const euro = await screen.findByDisplayValue('USD', 'EUR');
    const euroValue = euro.value;

    userEvent.type(valueInput, 77.00);
    userEvent.type(descInput, 'grana em euro');
    userEvent.selectOptions(currencyInput, euroValue);
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Saúde');
    userEvent.click(formButton);

    const newValueInput = await screen.findByTestId(valueTestId);
    expect(newValueInput).toHaveTextContent('');

    const data = await screen.findAllByRole('cell');
    expect(data[0]).toHaveTextContent('grana em euro');
  });
});
