import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, total } = this.props;
    return (
      <>
        <p data-testid="email-field">{ userEmail }</p>
        <p data-testid="total-field">{ total }</p>
        <p data-testid="header-currency-field">BRL</p>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
