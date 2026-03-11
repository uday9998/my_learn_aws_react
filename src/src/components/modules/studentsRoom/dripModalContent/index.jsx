import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import Icon from 'components/elements/Icon';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import momentTimezone from 'moment-timezone';
import './index.scss';

const DripModalContent = ({ closeModal, lesson, darkMode }) => {
   const userTimeZone = momentTimezone.tz.guess();
   const dateUserTimeZone = momentTimezone.utc(lesson.drip_date).tz(userTimeZone);
   const dateUserTimeZoneFormat = dateUserTimeZone.format('MMMM DD, YYYY hh:mm A');

   return (
      <div className='dripModal'>
         <div
            className='congratulationsCloseIcon'
            role='presentation'
            onClick={ () => closeModal() }
         >
            <Icon name='CloseXNew' color='var(--memberTextColorSecond)' />
         </div>
         <div className='congratulationsRectangle'>
            <div className='titleRectangle'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.large }
                  inner={ `${ lesson.title } has not yet been released.` }
                  className='congratulationsTitle'
                  // style={ { color: '#fff' } }
                  // color={ darkMode ? '#fff' : '#3f4f65' }
               />
               <br />
               <br />
               {/* { lesson.drip_type === 'date'
                  && ( */}
               <>
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.medium }
                     inner='This content will be available on'
                     className='congratulationsTitle'
                     // style={ { color: '#fff' } }
                     color={ darkMode ? '#fff' : '#3f4f65' }
                  />
                  <br />
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.medium }
                     inner={ dateUserTimeZoneFormat }
                     className='congratulationsTitle'
                  />
               </>
               {/* )} */}

               {/* { lesson.drip_type === 'days'
               && (
               <>
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.medium }
                     inner={ `This content will be available to you in ${ lesson.diff_days } ${ lesson.diff_days === 1 ? 'day' : 'days' }.` }
                     className='congratulationsTitle'
                     style={ { color: '#fff' } }
                     color={ darkMode ? '#fff' : '#3f4f65' }
                  />
                  <br />
               </>
               )} */}
            </div>
            <BaseButton
               theme={ btnTheme.darkGreen }
               size={ btnSizes.large }
               text='Ok, Got it'
               onClick={ () => { closeModal(); } }
               style={ {
                  background: 'var(--buttonBgcolor)',
                  border: '1px solid var(--textColor)',
                  color: 'var(--textColor)',
               } }
            />
         </div>

      </div>
   );
};

DripModalContent.propTypes = {
   closeModal: PropTypes.func,
   lesson: PropTypes.object,
   darkMode: PropTypes.bool,

};

export default DripModalContent;
