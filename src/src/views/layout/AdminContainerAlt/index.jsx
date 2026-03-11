/* eslint-disable camelcase */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router';
// import { authUserSelector } from 'state/modules/common/selectors';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Header from '../AdminHeader';
import Content from '../AdminContent';
import ContentAlt from '../AdminContentAlt';

const AdminContainer = ({ children, className, isLoading }) => {
   // const { email, is_verified_email } = useSelector(authUserSelector);
   // const location = useLocation();
   // const closeVerifiedEmail = (location.pathname.includes('landings') && location.pathname.split('/').length > 3 && location.pathname.split('/')[location.pathname.split('/').length - 1] === 'edit')
   // || location.hash === '#checkout/template1' || location.hash === '#checkout/template2' || location.hash === '#checkout/template3'
   // || location.pathname.includes('schoolroom/template');
   return (
      <div className={ `adminContainerAlt ${ className }` }>
         {/* {!is_verified_email && !closeVerifiedEmail && (
            <div className='verify-email-alert'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.extraSmall }
                  inner={ `Please confirm your email address to verify your account as soon as possible. A confirmation message was sent to ${ email }` }
                  className='text-center'
                  color='#7cb740'
               />
            </div>
         )} */}
         {isLoading ? (
            <LoaderSpinner />
         ) : (
            children
         )}
      </div>
   );
};

AdminContainer.defaultProps = {
   className: '',
};

AdminContainer.propTypes = {
   isLoading: PropTypes.bool,
   children: PropTypes.any,
   className: PropTypes.string,
};

AdminContainer.Header = Header;
AdminContainer.Content = Content;
AdminContainer.ContentAlt = ContentAlt;

export default AdminContainer;
