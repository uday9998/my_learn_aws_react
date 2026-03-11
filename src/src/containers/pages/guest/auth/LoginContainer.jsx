import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Router from 'routes/router';
import { inputsSelector } from 'state/modules/login/selectors';
import { setInput as setInputAction } from 'state/modules/login/actions';
import { loginStartOperation } from 'state/modules/login/operations';
import { connect } from 'react-redux';
import Login from 'views/pages/LogIn';


class LoginContainer extends Component {
   static propTypes = {
      inputs: PropTypes.object.isRequired,
      setInput: PropTypes.func.isRequired,
      login: PropTypes.func.isRequired,
   }

   handleInputChange = (name, value) => {
      const { setInput } = this.props;
      setInput(name, value);
   }

   handleLogin = () => {
      const { inputs } = this.props;
      const { login } = this.props;
      const newInputs = {
         email: inputs.email,
         password: inputs.password,
      };
      login(newInputs);
   }

   render() {
      const {
         inputs: {
            email,
            password,
         },
      } = this.props;
      return (
         <>
            <Login
               onChange={ (key, value) => this.handleInputChange(key, value) }
               email={ email }
               password={ password }
               onSubmit={ this.handleLogin }
            />
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      inputs: inputsSelector(state),

   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setInput: (key, value) => {
         dispatch(setInputAction(key, value));
      },
      login: (inputs) => {
         dispatch(loginStartOperation(inputs));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
