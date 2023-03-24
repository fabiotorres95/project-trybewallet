import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
          {expenses.map((obj) => {
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
                <td>futuro botão</td>
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
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Table);
