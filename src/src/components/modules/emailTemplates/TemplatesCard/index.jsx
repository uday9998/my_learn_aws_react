import React from 'react';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Select from 'components/elements/form/Select';
import PropTypes from 'prop-types';

const TemplatesCard = ({ handleCourseSelectChange, courseSelectChange, courses }) => {
   return (
      <SelectedWrapper>
         <div className='templatesCard'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner='Email Notifications'
            />
            <div className='m-t-exl'>
               <Select
                  placeholder='Please Choose an Option'
                  label='Class'
                  iconColor='#3f4f65'
                  padding='11px 16px'
                  options={ courses }
                  onChange={ (name, value) => handleCourseSelectChange(name, value) }
                  value={ courseSelectChange === 0 ? (courses[0] && courses[0].value) : courseSelectChange }
               />
            </div>
         </div>
      </SelectedWrapper>
   );
};

TemplatesCard.propTypes = {
   handleCourseSelectChange: PropTypes.func,
   courseSelectChange: PropTypes.number,
   courses: PropTypes.array,
};

export default TemplatesCard;
