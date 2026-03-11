import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Tabs from 'components/elements/tabs';
import ModalNew from 'components/elements/ModalNew';
import './index.scss';
import DateTimePicker from 'components/elements/Date&TimePicker';
import IconNew from 'components/elements/iconsSize';
import Button, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import moment from 'moment';
import Input from 'components/elements/inputNew';
import DesignCourseSpecificDate from '../DesignCourseSpecificDate';

const DesignCourseSectionDripDate = ({ onSave, onCancel }) => {
   const tabs = [
      { key: 'Week', value: 'week' },
      { key: 'Month', value: 'month' },
      { key: 'Year', value: 'year' },
      { key: 'Custom', value: 'custom' },
   ];
   const [tab, setTab] = useState('custom');
   const [data, setData] = useState({
      count: 1,
      type: 'custom',
      date: '',
   });
   const [isOnSelectCustomDate, setIsOnSelectCustomDate] = useState(false);
   const onSwitchTab = (value) => {
      setData({
         count: 1,
         type: value,
      });
      setTab(value);
   };
   const handleChange = (name, value, timeType) => {
      if (name === 'time') {
         setData({
            ...data,
            [name]: value,
            timeType,
         });
         return;
      }
      setData({
         ...data,
         [name]: value,
      });
   };
   return (
      <ModalNew
         onCloseModal={ onCancel }
      >
         <div className='design__course__drip__date' onClick={ (e) => { e.stopPropagation(e); } } role='presentation'>
            {isOnSelectCustomDate ? (
               <div className='design__course__drip__date__custom__select'>
                  <div className='design__course__drip__date__header'>
                     <div className='title'>
                        <div className='title__icon' role='presentation' onClick={ (e) => { e.stopPropagation(); setIsOnSelectCustomDate(false); } }>
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
                           inner={ data.date ? `${ moment(data.date).format('DD / MM / YYYY') } ${ data.time ? ` ${ data.time }` : '' }` : 'Date not selected' }
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
                        onClick={ isOnSelectCustomDate ? (e) => {
                           e.stopPropagation();
                           setIsOnSelectCustomDate(false);
                           setData({});
                        } : onCancel }
                        size={ btnSizes.large120 }
                        text='Cancel'
                     />
                     <Button
                        onClick={ (e) => { e.stopPropagation(); setIsOnSelectCustomDate(false); } }
                        text={ isOnSelectCustomDate ? 'Select' : 'Save' }
                        disabled={ !data.date || !data.time }
                        size={ btnSizes.large120 }
                     />
                  </div>
               </div>
            ) : (
               <div className='design__course__drip__date__content'>
                  <div className='design__course__drip__date__top'>
                     <Text
                        inner='Drip Days'
                        type={ types.medium }
                        size={ sizes.xxlarge }
                     />
                     <Text
                        inner='You can choose when this course will be available'
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978' } }
                     />
                  </div>
                  <Tabs
                     variants={ tabs }
                     selectedVariant={ tab }
                     isFullWidth={ true }
                     onSelect={ (value) => onSwitchTab(value) }
                  />
                  {tab === 'custom' ? (
                     <DesignCourseSpecificDate
                        date={ data.date }
                        setIsOnSelectCustomDate={ setIsOnSelectCustomDate }
                        time={ data.time }
                        timeType={ data.timeType }
                     />
                  ) : (
                     <div className='design__course__drip__date__input'>
                        <Input
                           name='count'
                           type='number'
                           value={ data.count || 1 }
                           onChange={ (name, value) => (value >= 1 ? handleChange(name, value) : {}) }
                           placeholder={ `Enter count of ${ tabs.filter((t) => t.value === tab)[0].key }` }
                        />
                     </div>
                  )}
                  <div className='design__course__drip__date__buttons'>
                     <Button
                        theme={ themes.secondary }
                        onClick={ isOnSelectCustomDate ? (e) => { e.stopPropagation(); setIsOnSelectCustomDate(false); }
                           : onCancel }
                        text='Cancel'
                        size={ btnSizes.large120 }
                     />
                     <Button
                        size={ btnSizes.large120 }
                        disabled={ data.type === 'custom' ? !data.date : false }
                        onClick={ () => onSave(2, data) }
                        text={ isOnSelectCustomDate ? 'Select' : 'Save' }
                     />
                  </div>
               </div>
            )}

         </div>
      </ModalNew>
   );
};

DesignCourseSectionDripDate.propTypes = {
   onCancel: PropTypes.func,
   onSave: PropTypes.func,
};

export default DesignCourseSectionDripDate;
