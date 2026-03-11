import React from 'react';
import './index.scss';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import CheckBox from 'components/elements/form/CheckBox';
import Tooltip from 'components/elements/members/Tooltip';
import PropTypes from 'prop-types';

const NotificationsCard = ({
   handleCheckboxChange, checkBoxValues, template, handleCheckboxChangeForCourse,
}) => {
   return (
      <SelectedWrapper>
         <div className='notificationsCard'>
            <div style={ { flexDirection: 'row' } }>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Notifications'
               />
               <Tooltip
                  hintText='These settings will determine what notifications you as the owner recieves ance the action is taken. You can modify the settings for each course by selecting from the dropdown above.'
                  style={ { top: '-3px' } }
                  hintStyle={ { bottom: 'auto', top: '22px', left: '-110px' } }
               />
            </div>
            <div className='m-t-m'>
               <CheckBox
                  label='When a student signs up'
                  name='notify_course_signup'
                  filled
                  onChange={ (name, value) => handleCheckboxChange(name, value) }
                  checked={ checkBoxValues.notify_course_signup === 'on' }
               />
               <CheckBox
                  label='When someone adds a comment'
                  name='notify_comment'
                  filled
                  checked={ template.notify_comment }
                  onChange={ (name, value) => handleCheckboxChangeForCourse(name, value) }
               />
               <CheckBox
                  label='When a sale occurs'
                  name='notify_sale'
                  filled
                  checked={ template.notify_sale }
                  onChange={ (name, value) => handleCheckboxChangeForCourse(name, value) }
               />
               <CheckBox
                  label='When someone cancels'
                  name='notify_cancel'
                  filled
                  checked={ template.notify_cancel }
                  onChange={ (name, value) => handleCheckboxChangeForCourse(name, value) }
               />
            </div>
         </div>
      </SelectedWrapper>
   );
};

NotificationsCard.propTypes = {
   checkBoxValues: PropTypes.object,
   handleCheckboxChange: PropTypes.func,
   handleCheckboxChangeForCourse: PropTypes.func,
   template: PropTypes.any,
};

export default NotificationsCard;
