import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize, THEMES as btnThemes } from 'components/elements/buttons/BaseButtonNew';
import Select from 'components/elements/SelectNew';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const styles = {
   cancel: {
      borderRadius: '4px',
      color: '#3f4f65',
      backgroundColor: '#f0f4f7',
   },
   save: {
      borderRadius: '4px',
      color: '#fff',
      backgroundColor: '#7cb740',
   },
};

const EnrolledIn = ({
   onClose, courses, handleInputChange, saveAction, currentAction, position,
}) => {
   const [localErrorMessages, setLocalErrorMessages] = useState([]);

   const addLocalErrorMessage = (message) => {
      if (!localErrorMessages.includes(message)) {
         setLocalErrorMessages(prev => [...prev, message]);
      }
   };

   const coursesForSelectOption = courses.map(course => ({ label: course.name, value: course.id }));
   const saveActionFunc = () => {
      if (!currentAction.payload.course_id) {
         addLocalErrorMessage('The class field is required.');
         return;
      }

      if (position) {
         saveAction({ course_id: currentAction.payload.course_id });
      } else {
         saveAction({
            type: 'enroll_in', id: currentAction.id, payload: { course_id: currentAction.payload.course_id },
         });
      }
   };

   const changeInput = (name, value) => {
      if (localErrorMessages.length) {
         setLocalErrorMessages([]);
      }

      handleInputChange(name, value, 'currentAction');
   };

   return (
      <div className='trigger-enrolledin'>
         <div className='trigger-card-title'>
            <Text
               type={ TextType.medium160 }
               size={ TextSize.xlarge }
               inner='Enroll In'
            />
            <Text
               type={ TextType.regularLarge }
               size={ TextSize.small }
               inner='Choose The Product For This Action.'
               style={ { color: '#727978' } }
            />
         </div>
         <div className='trigger-card-content'>
            <div className='m-t-m' />
            <div className='trigger-card-form'>
               <div className='trigger-card-form-select'>
                  <ErrorMessageWrapper errorMessages={ localErrorMessages }>
                     <Select
                        label='Select Product'
                        style={ { height: '48px' } }
                        id='emailto'
                        placeholder='Select Product'
                        type='select-medium'
                        options={ coursesForSelectOption }
                        name='course_id'
                        value={ currentAction.payload.course_id }
                        onChange={ changeInput }
                        icon='TriangleDownBlack'
                     />
                  </ErrorMessageWrapper>
               </div>
            </div>
         </div>
         <div className='trigger-card-btns'>
            <BaseButton
               theme={ btnThemes.secondary }
               text='Cancel'
               onClick={ onClose }
            />
            <BaseButton
               text='Save'
               onClick={ saveActionFunc }
            />
         </div>
      </div>
   );
};

EnrolledIn.propTypes = {
   onClose: PropTypes.func,
   courses: PropTypes.array,
   handleInputChange: PropTypes.func,
   currentAction: PropTypes.object,
   saveAction: PropTypes.func,
   position: PropTypes.string,
};

export default EnrolledIn;
