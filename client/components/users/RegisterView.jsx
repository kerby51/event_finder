import React from 'react';
import LoginLinkModal from './LoginLinkModal.jsx';

const propTypes = {
 openModal: React.PropTypes.func,
};

class RegisterView extends React.Component {
  render() {
   return (
     <div className="register-link">
       <h4
         className="register"
         onClick={this.props.openModal}
       >
       Register
       </h4>
     </div>
   );
 }
};

RegisterView.propTypes = propTypes;

export default RegisterView;
