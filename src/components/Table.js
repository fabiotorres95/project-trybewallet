import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expensesList, totalValue } from '../redux/actions';

class Table extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (convertedValue, index) => {
    const { expenses, dispatch } = this.props;
    expenses.splice(index, 1);

    const newArray = [];
    expenses.forEach((obj) => newArray.push(obj));
    dispatch(expensesList(newArray));

    const minusOne = -1;
    const negative = convertedValue * minusOne;
    dispatch(totalValue(negative));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((obj, index) => {
            const floatValue = parseFloat(obj.value);
            const convertedValue = floatValue * obj.exchangeRates[obj.currency].ask;
            return (
              <tr key={ obj.id }>
                <td>{ obj.description }</td>
                <td>{ obj.tag }</td>
                <td>{ obj.method }</td>
                <td>{ parseFloat(obj.value).toFixed(2) }</td>
                <td>{ obj.exchangeRates[obj.currency].name }</td>
                <td>{ parseFloat(obj.exchangeRates[obj.currency].ask).toFixed(2)}</td>
                <td>{ convertedValue.toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(convertedValue, index) }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Table);
