import { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import image from 'assets/images/affiliateCreateImage.png';
import Button from 'components/elements/buttons/BaseButtonNew';


const AutomationCreatePageView = ({ onCreateAutomation }) => {
   const [name, setName] = useState('');
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addLocalErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);
      }
   };

   const changeName = (name, value) => {
      if (localErrorMessages.length) {
         setLocalErrorMessages([]);
      }

      setName(value);
   };

   const createAutomation = async () => {
      const { errors: { name: nameMessages = [] } = {} } = await onCreateAutomation(name) || {};

      if (nameMessages.length) {
         addLocalErrorMessage(nameMessages[1] || nameMessages[0]);
      }
   };

   return (
      <div className='automation__create__page__bottom'>
         <div className='automation__create__page__bottom__left'>
            <div className='automation__create__page__bottom__left__top'>
               <Text
                  inner='Automation Information'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <Input
                  errorMessages={ localErrorMessages }
                  label='Automation Name'
                  maxlength={ 150 }
                  helpText={ `${ name.length }/150` }
                  value={ name }
                  onChange={ changeName }
                  placeholder='Enter Automation Sequence Name'
               />
            </div>
            <div className='button__create__automation'>
               <Button
                  text='Create Automation'
                  onClick={ createAutomation }
               />
            </div>

         </div>
         <img src={ image } alt='' />
      </div>
   );
};

AutomationCreatePageView.propTypes = {
   onCreateAutomation: PropTypes.func,
};

export default AutomationCreatePageView;
