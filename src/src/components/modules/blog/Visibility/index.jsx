import React from 'react';
import './index.scss';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import RadioBox from 'components/elements/form/Radio';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Icon from 'components/elements/Icon';
import PropTypes from 'prop-types';
import CheckList from 'components/elements/checkListNew';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import Switch from 'components/elements/form/Switch';
import moment from 'moment';
import Input from 'components/elements/inputNew';
import { TimePicker } from 'antd';
// import Select from 'components/elements/form/Select';
// import ColorInput from 'components/elements/form/ColorInput';
// const CustomInput = React.forwardRef(({ onClick, value }) => (
//    <input
//       className='uk-input'
//       onClick={ onClick }
//       value={ value }
//       type='text'
//       readOnly={ true }
//    />
// ));


const Visibility = ({ post, handleInputChange }) => {
   const visibilityVariants = [
      { key: 'Published', subtitle: 'The article will be published after you click the "Save" button.', value: 1 },
      { key: 'Unpublished', subtitle: 'The article will be saved as a "Draft" after you click the "Save" button.', value: 0 },
      { key: 'Set A Specific Publishing Date', subtitle: 'The article will be published on the given publication date after you click the "Save" button.', value: 2 },
   ];

   return (
      <div className='visibility__module'>
         <div>
            <div>
               <Text
                  type={ TextType.medium160 }
                  size={ TextSize.xlarge }
                  inner='Visibility'
               />
            </div>
            <div className='visibility__module_subtitle'>
               <Text
                  type={ TextType.regularDefaultGrey }
                  size={ TextSize.small }
                  inner='Set the visibility for this article'
               />
            </div>
         </div>
         <div>
            <CheckList
               items={ visibilityVariants }
               values={ [post.is_published] }
               onChange={ (value) => handleInputChange('is_published', value, 'post') }
               hasSubtitle={ true }
            />
         </div>
         { post.is_published === 2 && (
            <div className='visibility__module_date'>
               <Input
                  type='date'
                  value={ post.publish_date ? new Date(post.publish_date) : null }
                  name='date'
                  onChange={ (name, value) => handleInputChange('publish_date', value, 'post') }
                  placeholder='Select Date'
               />
               <div className={ post.publish_time ? 'edit__time__picker__wrapper active__placeholder' : 'edit__time__picker__wrapper' }>
                  <TimePicker 
                     className='inputNew__timepicker'
                     onChange={ (time, timeString) => {
                        handleInputChange('publish_time', timeString, 'post');
                     } }
                     placeholder={ post.publish_time ? post.publish_time : 'Enter the send time' }
                  />
               </div>
               {/* <Input
                  type='time'
                  value={ post.publish_time }
                  name='time'
                  onChange={ (name, value) => { handleInputChange('publish_time', value, 'post'); } }
                  placeholder='Enter the send time'
               /> */}
            </div>
         )}
      </div>
   );
};

Visibility.propTypes = {
   post: PropTypes.object,
   handleInputChange: PropTypes.func,
};

export default Visibility;
