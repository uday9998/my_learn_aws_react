import React from 'react';
import PropTypes from 'prop-types';
import { BreadCrumb } from 'components/modules/breadcrumbs';
import IconButton from 'components/elements/buttons/IconButton';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import { useHistory } from 'react-router';
import './index.scss';
import Tabs from 'components/elements/tabs';
import AffiliateSettingsGeneral from './Components/General';
import AffiliateSettingsEmail from './Components/Email';
import AffiliateSettingsSignIn from './Components/SignIn';

const AffiliateSettingsPage = ({
   goToAffiliate, handleSave, tab, setTab,
}) => {
   const history = useHistory();
   return (
      <div className='affiliate__settings'>
         <BreadCrumb
            links={ [
               { text: 'Affiliate Program', goTo: goToAffiliate },
               { text: 'Settings', goTo: () => {} },
            ] }
         />
         <div className='affiliate__settings__top'>
            <div className='affiliate__settings__top__left'>
               <IconButton
                  name='AffiliateGoBackArrowL'
                  onClick={ () => history.goBack() }
               />
               <Text
                  inner='Affiliate Program Settings'
                  type={ types.regularDefaultSmallX }
                  size={ sizes.size_28 }
               />
            </div>
            <Button
               text='Save Changes'
               onClick={ handleSave }
            />
         </div>
         <Tabs
            isButton={ false }
            hasIcon={ true }
            variants={ [
               { value: 'general', key: 'General Settings', iconName: 'AffiliateSettingsTabM' },
               { value: 'email', key: 'Welcome Email', iconName: 'AffiliateMailTabM' },
               { value: 'signin', key: 'Sign In / Sign Up Design', iconName: 'AffiliateSignInTabM' },
            ] }
            onSelect={ (value) => setTab(value) }
            selectedVariant={ tab }
         />
         {tab === 'general' && (
            <AffiliateSettingsGeneral />
         )}
         {tab === 'email' && (
            <AffiliateSettingsEmail />
         )}
         {tab === 'signin' && (
            <AffiliateSettingsSignIn />
         )}
      </div>
   );
};

AffiliateSettingsPage.propTypes = {
   goToAffiliate: PropTypes.func,
   handleSave: PropTypes.func,
   tab: PropTypes.string,
   setTab: PropTypes.func,
};

export default AffiliateSettingsPage;
