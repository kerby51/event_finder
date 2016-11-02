import React from 'react';
import RegisterView from './RegisterView.jsx';
import LoginLink from './LoginLink.jsx';
import LoginLinkModal from './LoginLinkModal.jsx';

const propTypes = {
  logIn: React.PropTypes.func,
  signUp: React.PropTypes.func,
};

class Login extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     modalOpen: false,
     buttonText: '',
   };
   this.openModalLogin = this.openModalLogin.bind(this);
   this.openModalSignup = this.openModalSignup.bind(this);
   this.closeModal = this.closeModal.bind(this);
  }
  openModalLogin() {
   this.setState({
     modalOpen: true,
     buttonText: 'Log-In',
   });
 }
  openModalSignup() {
   this.setState({
     modalOpen: true,
     buttonText: 'Register',
   });
  }
  closeModal() {
   this.setState({
     modalOpen: false,
     buttonText: 'Log-In',
   });
  }

  render() {
   return (
     <div>
       <LoginLink
         openModal={this.openModalLogin}
       />
       <RegisterView
         openModal={this.openModalSignup}
       />
       { this.state.modalOpen ?
         <LoginLinkModal
            closeModal={this.closeModal}
            logIn={this.props.logIn}
            signUp={this.props.signUp}
            buttonText={this.state.buttonText}
          /> : false }
     </div>
   );
 }
}

Login.propTypes = propTypes;

export default Login;
