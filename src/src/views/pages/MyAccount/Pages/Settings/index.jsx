import React from 'react';
import { TYPES as types, SIZES as sizes, TextWithTooltip } from 'components/elements/TextNew';
import './index.scss';
import Tabs from 'components/elements/tabs';
import { useApiQuery } from 'utils/hooks/useQuery';
import { myAccountInformation, updateMyAccount } from 'api';
import LoaderMini from 'components/elements/loaderMini';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { MyAccountContext } from 'containers/pages/member/account';
import MyAccountSettingsPersonal from './Components/Personal';
import MyAccountSettingsPassword from './Components/Password';
// import MyAccountSettingsAddress from './Components/Address';
import MyAccountSettingsSocial from './Components/Social';
import { useTranslation } from 'hooks/useTranslation';

const MyAccountSettings = () => {
   const [tab, setTab] = React.useState('personal');
   const { data, setData, loading } = useApiQuery(myAccountInformation);
   const { user, changeUser } = React.useContext(MyAccountContext);
   const { t } = useTranslation();
   const [update] = useSubmitForm(updateMyAccount);
   const generalTabs = [
      { key: t('Personal Information'), value: 'personal', iconName: 'PersonalTabM' },
      { key: t('Password'), value: 'password', iconName: 'PasswordTabM' },
      // { key: 'Address', value: 'address', iconName: 'AddressTabM' },
      { key: t('Social Links'), value: 'social', iconName: 'SocialLinksTabM' },
   ];
   const SettingsTabView = () => {
      switch (tab) {
         case 'personal':
            return MyAccountSettingsPersonal;
         case 'password':
            return MyAccountSettingsPassword;
         // case 'address':
         //    return MyAccountSettingsAddress;
         case 'social':
            return MyAccountSettingsSocial;
         default:
            return MyAccountSettingsPersonal;
      }
   };

   const handleSaveSettings = () => {
      let payload = {};
      switch (tab) {
         case 'personal':
            payload = {
               picture_full_src: data.user_data.picture_full_src,
               picture_src: data.user_data.picture_src,
               name: data.user_data.name,
               about_me: data.user_data.about_me,
               time_zone: data.user_data.time_zone,
            };
            break;
         case 'password':
            break;
         case 'address':
            break;
         case 'social':
            break;
         default:
      }
      update(payload, () => {
         const successMessage = t('Changes saved successfully.');
         if (isPrint(successMessage)) {
            toast.success(successMessage);
         }
         changeUser({
            ...user, ...payload,
         });
      });
   };

   const handleSettingsInputChange = (name, value, isBilling) => {
      if (name === 'picture_full_src') {
         setData({
            ...data,
            user_data: {
               ...data.user_data,
               [name]: value,
               'picture_src': value,
            },
         });
         return;
      }
      if (isBilling) {
         setData({
            ...data,
            page_data: {
               ...data.page_data,
               billingAddressData: {
                  ...data.page_data.billingAddressData,
                  [name]: value,
               },
            },
         });
         return;
      }
      setData({
         ...data,
         user_data: {
            ...data.user_data,
            [name]: value,
         },
      });
   };


   const handleSocialChange = (name, value) => {
      setData({
         ...data,
         page_data: {
            ...data.page_data,
            socialAccountsData: {
               ...data.page_data.socialAccountsData,
               [name]: value,
            },
         },
      });
   };

   const Component = SettingsTabView();
   return (
      <div className='my__account__settings'>
         {loading ? (
            <LoaderMini />
         ) : (
            <>
               <TextWithTooltip
                  inner={ t('General Settings') }
                  type={ types.medium160 }
                  size={ sizes.xlarge }
                  tooltip=''
                  isIconRigth={ true }
               />
               <Tabs
                  variants={ generalTabs }
                  selectedVariant={ tab }
                  isFullWidth={ true }
                  isButton={ false }
                  hasIcon={ true }
                  onSelect={ (e) => setTab(e) }
               />
               <div className='my__account__settings__content'>
                  <Component
                     handleSaveSettings={ handleSaveSettings }
                     data={ data.user_data }
                     socialData={ data.page_data.socialAccountsData }
                     handleSocialChange={ handleSocialChange }
                     billingData={ data.page_data.billingAddressData }
                     handleInputChange={ handleSettingsInputChange }
                     t={ t }
                  />
               </div>
            </>
         )}

      </div>
   );
};

MyAccountSettings.propTypes = {

};

export default MyAccountSettings;
