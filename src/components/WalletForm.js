import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrenciesList } from '../redux/actions';

class WalletForm extends Component {
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

  render() {
    const { currencies } = this.props;
    return (
      <>
        <div>WalletForm</div>
        <form>
          <label>
            Valor:
            <input name="value" type="text" data-testid="value-input" />
          </label>
          <label>
            Descrição:
            <input name="description" type="text" data-testid="description-input" />
          </label>
          <select data-testid="currency-input">
            {currencies.map((code) => (
              <option key={ code }>{ code }</option>
            ))}
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
