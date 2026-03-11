import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Router from 'routes/router';
import { inputsSelector } from 'state/modules/login/selectors';
import { setInput as setInputAction } from 'state/modules/login/actions';
import { loginStartOperation, resetPasswordOperation } from 'state/modules/login/operations';
import { connect } from 'react-redux';
import * as common from 'state/modules/common/selectors';
import ResetPasswordTemplate from 'views/other/ResetPassword';

class ResetPasswordContainer extends Component {
   static propTypes = {
      setInput: PropTypes.func.isRequired,
      resetPassword: PropTypes.func.isRequired,
      match: PropTypes.object,
      siteInfo: PropTypes.object,
   }

   componentDidMount() {
      const { siteInfo } = this.props;
      if (siteInfo.favicon) {
         document.querySelector("link[rel*='icon']").href = siteInfo.favicon;
      }
      window.addEventListener('keydown', this.onKeyDown);
   }

   componentWillUnmount() {
      document.querySelector("link[rel*='icon']").href = '/favicon.ico';
      window.removeEventListener('keydown', this.onKeyDown);
   }

   onKeyDown = (event) => {
      if (event.key === 'Enter') {
         document.querySelector('.reset__button').click();
      }
   };

   handleInputChange = (name, value) => {
      const { setInput } = this.props;
      setInput(name, value);
   }

   handleLogin = (inputs) => {
      const { match, resetPassword } = this.props;
      const resetData = {
         email: inputs.email,
         password: inputs.password,
         password_confirmation: inputs.confirmPassword,
         token: match.params.token,
      };

      resetPassword(resetData);
   }

   render() {
      const { siteInfo } = this.props;
      const templateProps = siteInfo.other_pages.sign_in.other_page_section.props;
      return (
         <div style={ { height: '100vh' } }>
            <ResetPasswordTemplate
               onSubmit={ this.handleLogin }
               generalProps={ templateProps }
            />
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      inputs: inputsSelector(state),
      siteInfo: common.siteInfoSelector(state),
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
      resetPassword: (data) => {
         dispatch(resetPasswordOperation(data));
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
