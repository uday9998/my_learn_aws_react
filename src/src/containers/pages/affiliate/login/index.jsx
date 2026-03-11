import React from 'react';
import { connect } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import PropTypes from 'prop-types';
import './index.scss';
import AffiliateTemplate from 'views/pages/Affiliate/TemplateEditor';
import { loginStartOperation } from 'state/modules/login/operations';

export const AffiliateFrontContext = React.createContext();

const AffiliateLogin = ({ app, login }) => {
   const [data, setData] = React.useState({
      email: '',
      password: '',
      remember: false,
   });
   const handleInputChange = (name, value) => {
      setData({
         ...data,
         [name]: value,
      });
   };
   const onSubmit = () => {
      login(data);
   };
   return (
      <div className='affiliate__login'>
         <AffiliateFrontContext.Provider value={ {
            data, handleInputChange, onSubmit, isLive: true,
         } }
         >
            {app.affiliate && (
               <AffiliateTemplate
                  initalTemplate={ app.affiliate.sign_in }
                  isPreview={ true }
               />
            )}
         </AffiliateFrontContext.Provider>
      </div>
   );
};

const mapStateToProps = (state) => {
   return {
      app: siteInfoSelector(state),
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      login: (inputs) => {
         dispatch(loginStartOperation(inputs));
      },
   };
};

AffiliateLogin.propTypes = {
   app: PropTypes.object,
   login: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateLogin);
