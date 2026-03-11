import React, { useState } from 'react';
import AffiliateTemplate from 'views/pages/Affiliate/TemplateEditor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { checkUserAffiliate, registerAffiliate } from 'api';
import DeleteModal from 'components/elements/DeleteModal';
import { AffiliateFrontContext } from '../login';

const AffiliateRegister = ({ app }) => {
   const [submit] = useSubmitForm(registerAffiliate);
   const [checkUserRole] = useSubmitForm(checkUserAffiliate);
   const [data, setData] = useState({
      email: '',
      password: '',
      remember: false,
      is_affiliate: 1,
   });
   const [isConfModalOpen, setIsConfModalOpen] = useState(false);

   const handleInputChange = (name, value) => {
      setData({
         ...data,
         [name]: value,
      });
   };

   const closeConfModal = () => setIsConfModalOpen(false);

   const register = () => {
      submit([data], (e) => {
         const { token } = e;
         localStorage.setItem('authToken', token);
         window.location = '/affiliate/dashboard';
      });
      closeConfModal();
   };

   const onSubmit = async () => {
      let stopRegistering = false;

      await checkUserRole(
         data.email,
         ({ member, is_affiliate: isAffiliate }) => {
            if (isAffiliate) {
               toast.error('This email is already registered as an affiliate.');
               stopRegistering = true;
               return;
            }

            if (member) {
               stopRegistering = true;
               setIsConfModalOpen(true);
            }
         }
      );

      if (stopRegistering) return;

      register();
   };

   return (
      <div className='affiliate__login'>
         <AffiliateFrontContext.Provider value={ {
            data, handleInputChange, onSubmit, isLive: true, disabledButton: !data.is_agree,
         } }
         >
            {app.affiliate && (
               <AffiliateTemplate
                  initalTemplate={ app.affiliate.sign_up }
                  isPreview={ true }
               />
            )}
         </AffiliateFrontContext.Provider>
         {isConfModalOpen && (
            <DeleteModal
               title='You are also a member for this site, your member password will be changed to this new one.'
               deleteText='Sign up'
               onCancel={ closeConfModal }
               onDelete={ register }
            />
         )}
      </div>
   );
};
const mapStateToProps = (state) => {
   return {
      app: siteInfoSelector(state),
   };
};

const mapDispatchToProps = () => {
   return {

   };
};

AffiliateRegister.propTypes = {
   app: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateRegister);
