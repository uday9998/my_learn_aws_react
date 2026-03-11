import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminContainer from 'views/layout/AdminContainer';
import SiteHeader from 'views/layout/SiteHeader';
import ProfilePage from 'views/pages/Affiliate/Profile';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { updateAccount, updateMyAccount } from 'api';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const emailRegexp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const AffiliateProfile = ({ user }) => {
   const [updateAccountFunc] = useSubmitForm(updateMyAccount);
   const handleUpdateAccount = (inputs) => {
      if (!emailRegexp.test(inputs.paypal_email)) {
         toast.error('Not valid paypal email.');
         return;
      }

      updateAccountFunc(inputs, () => {
         if (isPrint('Changes saved successfuly.')) {
            toast.success('Changes saved successfuly.');
         }
      });
   };
   return (
      <AdminContainer>
         <AdminContainer.Header>
            <SiteHeader
               title='Profile Settings'
               // tooltip='asdas'
            />
         </AdminContainer.Header>
         <AdminContainer.Content>
            <ProfilePage
               account={ user }
               onSaveAccountInformation={ handleUpdateAccount }
               isVerifiedEmail={ user.is_verified_email }
            />
         </AdminContainer.Content>
      </AdminContainer>
   );
};

AffiliateProfile.propTypes = {
   user: PropTypes.object,
};

const mapStateToProps = (state) => {
   return {
      user: state.common.authUser,
   };
};

const mapDispatchToProps = () => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateProfile);
