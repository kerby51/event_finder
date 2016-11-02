import React from 'react';
import UserForm from './UserForm.jsx';

const propTypes = {
 closeModal: React.PropTypes.func,
 logIn: React.PropTypes.func,
 signUp: React.PropTypes.func,
 buttonText: React.PropTypes.string.isRequired,
};

const LoginLinkModal = ({ closeModal, logIn, signUp, buttonText }) => {
 return (
  <div>
   <div id="login-modal">
     <div id="show-login">
       <UserForm closeModal={closeModal} logIn={logIn} signUp={signUp} buttonText={buttonText} />
     </div>
    </div>
   </div>
 );
};

LoginLinkModal.propTypes = propTypes;

export default LoginLinkModal;
