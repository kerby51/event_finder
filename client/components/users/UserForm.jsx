import React from 'react';

const propTypes = {
  logIn: React.PropTypes.func,
  signUp: React.PropTypes.func,
  buttonText: React.PropTypes.string,
  closeModal: React.PropTypes.func,
};

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      invalidData: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.email && nextState.password);
  }

  handleInputChange(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const value = target.value;
    const updated = {};
    updated[name] = value;
    this.setState(updated);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.buttonText=="Register") {
      this.props.signUp(this.state);
    } else {
      this.props.logIn(this.state);
    }
    this.props.closeModal();
  }
  render() {
    return (
      <div>
        <a id="close-x" href="#" onClick={this.props.closeModal}>x</a>
        <form className="login-form" onSubmit={this.handleSubmit}>

          <input
            className="email_inputs"
            type="text"
            name="email"
            value={this.state.email}
            placeholder="email"
            onChange={this.handleInputChange}
          />
          <input
            className="email_inputs"
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.handleInputChange}
          />
          <input type="submit" onClick={this.handleSubmit} disabled={this.state.invalidData} className="sign-in-buttons" value={this.props.buttonText}  />
        </form>
      </div>
    );
  }
}

UserForm.propTypes = propTypes;

export default UserForm;

// id="submit_button" type="submit" value="SUBMIT"
