import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalNew from 'components/elements/ModalNew';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import { authUserSelector, screenWidthSelector } from 'state/modules/common/selectors';
import Icon from 'components/elements/Icon';
import logo from '../../../assets/images/miestrologo.svg'

class VerifyFromEmailModal extends Component {
    interval = null

    static propTypes = {
       resendCode: PropTypes.func,
       screenWidth: PropTypes.number,
       fromEmail: PropTypes.string,
       onClose: PropTypes.func,
    }

    state = {
       timer: 0,
    }

    handleResendCode = () => {
       const { resendCode, fromEmail } = this.props;
       const { timer } = this.state;
       if (timer > 0) return;
       resendCode({ fromEmail }, () => {
          this.setState({
             timer: 1,
          });
          setTimeout(() => {
             this.setState({
                timer: 0,
             });
          }, 30000);
       });
    }

    render() {
       const { screenWidth, onClose } = this.props;
       const { timer } = this.state;
       return (
          <ModalNew
             onCloseModal={ () => onClose(false) }
             className='from_verify_email_wrapper'
          >
             <div className='logo_wrapper'>
               <img src={logo} alt="" />
                {/* <Icon
                   name={ screenWidth < 1024 ? 'LogoMobile' : 'Logo' }
                /> */}
             </div>
             <Text
                type={ txtTypes.medium }
                size={ txtSizes.size_28 }
                inner='Please verify your email'
             />
             <div className='descripiton_wrapper'>
                <span>Click the link in your email to verify your sender email.</span>
                <span>If you don&apos;t see an email, you may need to check your spam folder.</span>
             </div>
             <div className='row-center resend-email-wrapper'>
                <span>Don&apos;t see the email?</span>
                <span
                   className={ `clickable-text ${ timer > 0 ? 'disabled' : '' }` }
                   role='presentation'
                   onClick={ timer > 0 ? () => {} : this.handleResendCode }
                >
                   Re-send email
                </span>
             </div>
             <div className='row-center'>
                <span>Need help?</span>
                <a
                   className='clickable-text'
                   href='https://support.miestro.com/'
                   target='_blank'
                   rel='noreferrer'
                >
                   Contact us
                </a>
             </div>
          </ModalNew>
       );
    }
}


const mapStateToProps = (state) => {
   return {
      authUser: authUserSelector(state),
      screenWidth: screenWidthSelector(state),
   };
};


export default connect(mapStateToProps)(VerifyFromEmailModal);
