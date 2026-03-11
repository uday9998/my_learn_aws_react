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

const DesignCourseSectionDripDate = ({
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
         [name]: name === 'time' ? `${value} ${variant}` : value,
      });
   };

   return (
      <>
         <DesignCourseSpecificDate
            date={ data.date }
            setIsOnSelectCustomDate={ setIsOnSelectCustomDate }
            time={ data.time }
         />

         {isOnSelectCustomDate && (
            <ModalNew
               onCloseModal={ isOnSelectCustomDate ? () => {} : onCancel }
            >
               <div className='design__course__drip__date'>
                  <div className='design__course__drip__date__custom__select'>
                     <div className='design__course__drip__date__header'>
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
                              inner={ data.date ? `${moment(data.date).format('DD / MM / YYYY')} ${data.time}` : 'Date not selected' }
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
                     <div className='design__course__drip__date__buttons'>
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
                           onClick={ () => { onSave(data); setIsOnSelectCustomDate(false); } }
                           text={ isOnSelectCustomDate ? 'Select' : 'Save' }
                           disabled={ !data.date || !data.time }
                           size={ btnSizes.large120 }
                        />
                     </div>
                  </div>
               </div>
            </ModalNew>
         )}
      </>
   );
};

DesignCourseSectionDripDate.propTypes = {
   onCancel: PropTypes.func,
   onSave: PropTypes.func,
   date: PropTypes.string,
   time: PropTypes.string,
};

export default DesignCourseSectionDripDate;
