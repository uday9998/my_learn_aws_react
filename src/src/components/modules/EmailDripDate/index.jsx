import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import ModalNew from 'components/elements/ModalNew';
import './index.scss';
import DateTimePicker from 'components/elements/Date&TimePicker';
import IconNew from 'components/elements/iconsSize';
import Button, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import moment from 'moment';
import DesignCourseSpecificDate from 'components/modules/designCourse/DesignCourseSpecificDate';


const EmailDripDate = ({
   onSave, onCancel, date, time,
}) => {
   const [data, setData] = useState({
      count: 1,
      type: 'custom',
      date,
      time,
   });
   const [isOnSelectCustomDate, setIsOnSelectCustomDate] = useState(false);

   const handleChange = (name, value, variant) => {
      setData({
         ...data,
         [name]: name === 'time' ? `${ value } ${ variant }` : value,
      });
   };

   return (
      <>
         <ModalNew onCloseModal={ onCancel } className='emailDripDate'>
            <div className='emailDripDate__title'>
               <Text
                  inner='Send Later'
                  type={ types.mediumSmall }
                  size={ sizes.xlarge }
               />
            </div>
            <div className='emailDripDate__subtitle'>
               <Text
                  inner='You can choose when to send this email'
                  type={ types.regularDefaultGrey }
                  size={ sizes.small }
               />
            </div>
            <DesignCourseSpecificDate
               date={ data.date }
               setIsOnSelectCustomDate={ setIsOnSelectCustomDate }
               time={ data.time }
               label='Send this email on ...'
               placeholder='Select date'
            />
            <div className='emailDripDate__buttons'>
               <Button
                  text='Cancel'
                  size={ btnSizes.large120 }
                  theme={ themes.secondary }
                  onClick={ () => onCancel() }
               />
               <Button
                  text={ !(data.date && data.time) ? 'Send on' : ` Send this email on ${ moment(data.date).format('MMMM DD, YYYY') } ${ data.time }` }
                  theme={ themes.primary }
                  size={ btnSizes.large120 }
                  onClick={ () => onSave('scheduled', `${ moment(data.date).format('YYYY-MM-DD') } ${ moment(data.time, ['h:mm A']).format('HH:mm') }`) }
                  disabled={ !(data.date && data.time) }
               />
            </div>
         </ModalNew>

         {isOnSelectCustomDate && (
            <ModalNew
               onCloseModal={ isOnSelectCustomDate ? () => {} : () => setIsOnSelectCustomDate(false) }
               className='email__drip__date'
            >
               <div className='email__drip__date__custom__select'>
                  <div className='email__drip__date__header'>
                     <div className='title'>
                        <div className='title__icon' role='presentation' onClick={ () => setIsOnSelectCustomDate(false) }>
                           <IconNew name='GoBackProgramM' />
                        </div>
                        <Text
                           inner='Select a Drip Date'
                           type={ types.regular160 }
                           size={ sizes.xlarge }
                        />
                     </div>
                     <div className='subtitle'>
                        <Text
                           inner={ (data.date && data.time) ? `${ moment(data.date).format('DD / MM / YYYY') } ${ data.time }` : 'Date not selected' }
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: '#727978' } }
                        />
                     </div>
                  </div>
                  <DateTimePicker
                     date={ data.date }
                     time={ data.time }
                     onChange={ handleChange }
                  />
                  <div className='email__drip__date__buttons'>
                     <Button
                        theme={ themes.secondary }
                        onClick={ isOnSelectCustomDate ? () => {
                           setIsOnSelectCustomDate(false);
                           setData({});
                        } : onCancel }
                        size={ btnSizes.large120 }
                        text='Cancel'
                     />
                     <Button
                        onClick={ () => { setIsOnSelectCustomDate(false); } }
                        text={ !(data.date && data.time) ? 'Select' : ` Select ${ moment(data.date).format('MMMM DD, YYYY') } ${ data.time }` }
                        disabled={ !data.date || !data.time }
                        size={ btnSizes.large120 }
                     />
                  </div>
               </div>
            </ModalNew>
         )}

      </>
   );
};

EmailDripDate.propTypes = {
   onCancel: PropTypes.func,
   onSave: PropTypes.func,
   date: PropTypes.string,
   time: PropTypes.string,

};

export default EmailDripDate;
