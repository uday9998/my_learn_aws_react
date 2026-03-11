import React, { useState } from 'react';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import TextInput from 'components/elements/inputNew';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import withLoading from 'utils/withLoading';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';

const LandingCreateModalContentLoading = withLoading('div');

const LandingCreateModalContent = ({
   onCancel, onApprove, title, content, acceptText, cancelText, loadingCreate,
}) => {
   const [landingName, setLandingName] = useState('');
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addLocalErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);

         setTimeout(() => {
            setLocalErrorMessages(prev => prev.filter(msg => msg !== message));
         }, 1500);
      }
   };

   const changeLandingName = (newValue) => {
      const noSymbolsRegexp = /^[a-zA-Z0-9\s]+$/;

      if (newValue && !noSymbolsRegexp.test(newValue)) {
         addLocalErrorMessage('Please enter only letters, numbers, and spaces');
         return;
      }

      setLandingName(newValue);
   };

   const createNewLanding = async (e) => {
      e.preventDefault();

      const { data: { errors = {} } = {} } = await onApprove(landingName);

      const { 0: linkErrMessage = [] } = Object.values(errors);

      if (linkErrMessage.length) {
         addLocalErrorMessage(linkErrMessage[0]);
      }
   };

   return (
      <div>
         <div className='landing_section_modal'>
            <div className='landing_section_closeModal'>
               <div
                  role='presentation'
                  className='closeIcon'
                  onClick={ () => onCancel() }
               >
                  <Icon name='CloseXNew' />
               </div>
            </div>
            <form className='landing_section_content' onSubmit={ createNewLanding }>
               <div className='landing_section_modal_title'>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.large }
                     inner={ title }
                  />
               </div>
               <div className='field__2'>
                  <TextInput
                     errorMessages={ localErrorMessages }
                     label='Title'
                     placeholder='Enter Landing Page Title Here'
                     id='landingName'
                     name='landingName'
                     maxlength={ 150 }
                     rightLabel={ `${ landingName.length }/150` }
                     value={ landingName }
                     onChange={ (name, value) => changeLandingName(value) }
                  />
               </div>
               <div className='landingModal__btns'>
                  <BaseButton
                     text={ acceptText }
                     type='submit'
                     // onClick={ () => onApprove(landingName) }
                  />
                  <BaseButton
                     theme={ btnTheme.secondary }
                     text={ cancelText }
                     onClick={ () => onCancel() }
                  />
               </div>
               <div className='landing_section_content__img__wrapper'>
                  <img src={ content } alt='Landing Template' />
               </div>
            </form>

         </div>
         <LandingCreateModalContentLoading isLoading={ loadingCreate } />
      </div>
   );
};

LandingCreateModalContent.defaultProps = {
   acceptText: 'Get Started',
   cancelText: 'Keep Browsing',
};

LandingCreateModalContent.propTypes = {
   onCancel: PropTypes.func,
   onApprove: PropTypes.func,
   title: PropTypes.string,
   content: PropTypes.string,
   acceptText: PropTypes.string,
   cancelText: PropTypes.string,
   loadingCreate: PropTypes.bool,
};

export default LandingCreateModalContent;
