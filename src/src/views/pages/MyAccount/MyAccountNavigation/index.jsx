import React from 'react';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { MyAccountContext } from 'containers/pages/member/account';
import Tabs from 'components/elements/tabs';
import DropTriggle from 'components/elements/newDropTriggle';
import QueryParams from 'utils/QueryParams';
import { useTranslation } from 'hooks/useTranslation';
// import NotificationsMyAccount from './Notifications';

const MyAccountNavigation = () => {
   const {
      user, tab, setTab, logout, getTabName,
   } = React.useContext(MyAccountContext);
   const { t } = useTranslation();
   const tabs = [
      { value: 'settings', key: t('Settings') },
      { value: 'my-portal', key: t('My Portal') },
      { value: 'communities', key: t('My Communities') },
      // { value: 'tags', key: 'Tags' },
      { value: 'certificates', key: t('Certificates') },
      // { value: 'billing', key: 'Billing' },
      // { value: 'comments', key: 'Comments' },
      // { value: 'saved', key: 'Saved Offers' },
      // { value: 'notes', key: 'Notes' },

   ];
   return (
      <div className='currentMember__account'>
         <div className='currentMember__account__background' />
         <div className='currentMember__account__buttons'>
            {/* <NotificationsMyAccount notifications={ user.notifications } /> */}
            <DropTriggle
               options={ [
                  { name: 'Log Out', iconName: 'LogOutMyAccount', onClick: () => logout() },
               ] }
               notShowMobileView
            />
         </div>
         <div className='currentMember__account__info'>
            <img className='currentMember__account__info__image' src={ user.picture_full_src } alt='' />
            <div className='currentMember__account__info__text'>
               <div className='left'>
                  <Text inner={ t('Welcome back, ') } type={ txtTypes.medium } size={ txtSizes.xxlarge } style={ { color: '#131F1E' } } />
                  <Text inner={ user.name } type={ txtTypes.medium } size={ txtSizes.xxlarge } style={ { color: '#131F1E' } } className='notranslate' />
                  {user.about_me && (
                     <Text inner={ user.about_me } style={ { color: '#727978' } } type={ txtTypes.regularDefault } size={ txtSizes.small } />
                  )}
               </div>
            </div>
         </div>
         <div className='currentMember__account__info__tabs'>
            <Tabs
               variants={ tabs }
               selectedVariant={ tab }
               onSelect={ (value) => { setTab(value); QueryParams.setHash(value); } }
               isButton={ false }
            />
         </div>
      </div>
   );
};

MyAccountNavigation.propTypes = {

};

export default MyAccountNavigation;
