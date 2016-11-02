import React from 'react';
import LoginLinkModal from './LoginLinkModal.jsx';

const propTypes = {
 openModal: React.PropTypes.func,
};

class LoginLink extends React.Component {
  render() {
    return (
      <div className="login-link">
        <a href="#" onClick={this.props.openModal} className="login">Login</a>
      </div>
    );
  }
};

LoginLink.propTypes = propTypes;

export default LoginLink;


