import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.verify = this.verify.bind(this);
    this.state = {
      email: '',
      password: '',
      isBtnDisabled: true,
    };
  }

  checkInfo = ({ target }) => {
    if (target.type === 'email') {
      this.setState(() => ({ email: target.value }), this.verify);
    } else {
      this.setState(() => ({ password: target.value }), this.verify);
    }
  };

  verify = () => {
    const { email, password } = this.state;
    let result = true;
    const size = 6;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (password.length >= size && email.match(emailRegex)) {
      result = false;
    }

    this.setState({ isBtnDisabled: result });
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <>
        <div>Login</div>
        <label>
          Email:
          <input
            type="email"
            data-testid="email-input"
            onChange={ this.checkInfo }
          />
        </label>
        <label>
          Senha:
          <input
            type="text"
            data-testid="password-input"
            onChange={ this.checkInfo }
          />
        </label>
        <button disabled={ isBtnDisabled }>Entrar</button>
      </>
    );
  }
}

export default Login;
