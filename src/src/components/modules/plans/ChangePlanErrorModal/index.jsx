import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Icon from 'components/elements/Icon';
import { Link } from 'react-router-dom';

const ChangePlanErrorModal = ({ changePlanErrors, onCloseErrorModal }) => {
   const changePlanErrorsFunc = () => {
      let text = '';
      const errorText = changePlanErrors.map(changePlanError => {
         switch (changePlanError) {
            case 'course_limit': text = 'courses';
               break;
            case 'members_limit': text = 'members';
               break;
            case 'admin_limit': text = 'admins';
               break;
            case 'site_limit': text = 'sites';
               break;
            default:
         }
         return text;
      });
      let errorTextWithComma = errorText[0];
      if (errorText.length === 2) {
         errorTextWithComma = `${ errorText[0] } and ${ errorText[1] }`;
      } else if (errorText.length === 3) {
         errorTextWithComma = `${ errorText[0] }, ${ errorText[1] } and ${ errorText[2] }`;
      } else if (errorText.length === 4) {
         errorTextWithComma = `${ errorText[0] }, ${ errorText[1] },${ errorText[2] } and ${ errorText[2] }`;
      }
      return errorTextWithComma;
   };

   const goToFunc = () => {
      let url = '';
      switch (changePlanErrors[0]) {
         case 'course_limit': url = '/admin/programs';
            break;
         case 'members_limit': url = '/admin/members';
            break;
         case 'admin_limit': url = '/admin/members';
            break;
         case 'site_limit': url = '/admin/settings#sites';
            break;
         default:
      }
      return url;
   };

   const goToTextFunc = () => {
      let text = '';
      switch (changePlanErrors[0]) {
         case 'course_limit': text = 'courses';
            break;
         case 'members_limit': text = 'members';
            break;
         case 'admin_limit': text = 'admins';
            break;
         case 'site_limit': text = 'sites';
            break;
         default:
      }
      return text;
   };

   return (
      <div className='changePlanError'>
         <div
            className='createDomain__close'
            role='presentation'
            onClick={ () => onCloseErrorModal() }
         >
            <Icon name='CloseXNew' />
         </div>
         <div className='createDomain__body'>
            <>
               <div className='createDomain__header'>
                  <Text
                     type={ TextType.large }
                     size={ TextSize.large }
                     inner='Downgrade Plan'
                  />
               </div>
               <div>
                  <Text
                     type={ TextType.large }
                     size={ TextSize.small }
                     inner={ `You have more ${ changePlanErrorsFunc() } than the downgraded plan allows, please delete some to be able to downgrade.` }
                  />
               </div>

               <div className='error__btns'>
                  <div>
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.large }
                        text='Cancel'
                        onClick={ () => onCloseErrorModal() }
                     />
                  </div>
                  <Link to={ goToFunc() }>
                     <div>
                        <BaseButton
                           size={ btnSize.large }
                           text={ `Go to ${ goToTextFunc() }` }
                           onClick={ () => {} }
                        />
                     </div>
                  </Link>
               </div>
            </>

         </div>
      </div>
   );
};


ChangePlanErrorModal.propTypes = {
   changePlanErrors: PropTypes.array,
   onCloseErrorModal: PropTypes.func,
};


export default ChangePlanErrorModal;
