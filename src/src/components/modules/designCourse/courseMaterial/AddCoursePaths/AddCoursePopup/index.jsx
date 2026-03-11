import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import TextInput from 'components/elements/form/TextInput';
import PropTypes from 'prop-types';

const AddCoursePopup = ({
   onInputChange,
   onClickCreate,
   onClickCancel,
   courseName,

}) => {
   return (
      <div className='addCoursePopup'>
         <div>
            <Text
               type={ TextType.bold }
               size={ TextSize.large }
               inner='Add New Class'
            />
            <div className='addCoursePopup__form'>
               <TextInput
                  placeholder='Example: Free guide on creating your product'
                  label='Class Name'
                  name='courseName'
                  value={ courseName }
                  onChange={ onInputChange }
               />
            </div>
         </div>
         <div className='addCoursePopup__btns'>
            <div className='btnWrapper m-r-l'>
               <BaseButton
                  theme={ btnTheme.grey }
                  size={ btnSize.large }
                  text='Cancel'
                  onClick={ onClickCancel }
               />
            </div>
            <div className='btnWrapper'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSize.large }
                  text='Create and Continue'
                  onClick={ onClickCreate }
               />
            </div>
         </div>
      </div>
   );
};

AddCoursePopup.propTypes = {
   onInputChange: PropTypes.func,
   onClickCancel: PropTypes.func,
   onClickCreate: PropTypes.func,
   courseName: PropTypes.string,
};
export default AddCoursePopup;
