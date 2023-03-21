import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrenciesList, expensesList } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.addExpense = this.addExpense.bind(this);
  }

  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies = async () => {
    const { dispatch } = this.props;
    const apiURL = await fetch('https://economia.awesomeapi.com.br/json/all');
    const api = await apiURL.json();
    const data = Object.keys(api);
    data.splice(1, 1);

    dispatch(saveCurrenciesList(data));
    return data;
  };

  addExpense = async () => {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, dispatch } = this.props;
    const { length } = expenses;
    const exchange = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await exchange.json();
    const expense = {
      id: length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    dispatch(expensesList(expense));
  };

  updateState = ({ target }) => {
    const key = target.name;
    if (key === 'value') {
      this.setState({ value: target.value });
    } else if (key === 'description') {
      this.setState({ description: target.value });
    } else if (key === 'currency') {
      this.setState({ currency: target.value });
    } else if (key === 'method') {
      this.setState({ method: target.value });
    } else if (key === 'tag') {
      this.setState({ tag: target.value });
    }
  };

  render() {
    const { currencies } = this.props;
    return (
      <>
        <div>WalletForm</div>
        <form>
          <label>
            Valor:
            <input
              name="value"
              type="number"
              step=".01"
              data-testid="value-input"
              onChange={ this.updateState }
            />
          </label>
          <label>
            Descrição:
            <input
              name="description"
              type="text"
              data-testid="description-input"
              onChange={ this.updateState }
            />
          </label>
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.updateState }
          >
            {currencies.map((code) => (
              <option key={ code }>{ code }</option>
            ))}
          </select>
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.updateState }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.updateState }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button onClick={ async () => this.addExpense }>Adicionar despesa</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
