import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import InlineEditor from 'components/modules/InlineEditor';
import useAutosizeTextArea from 'utils/useAutosizeTextArea.js';
import { getProperlyNotifyName } from 'utils/notificationHelpers';

const NotificationEditRight = ({ data, onInputChange, settings }) => {
   const textAreaRefTitle = useRef(null);
   const textAreaRefText = useRef(null);
   useAutosizeTextArea(textAreaRefTitle.current, data.title);
   useAutosizeTextArea(textAreaRefText.current, data.text);
   return (
      <div className='notification__edit__right'>
         <div className='notification__edit__right__top'>
            <Text
               inner={ getProperlyNotifyName(settings.id) || 'When a new student joins the school' }
               type={ txtTypes.medium160 }
               size={ txtSizes.xlarge }
            />
            <Input
               value={ data.subject }
               name='subject'
               onChange={ onInputChange }
               placeholder='Write a compelling subject'
               label='Subject Line'
            />
         </div>
         <div className='divider' />
         <div className='notification__edit__right__bottom' style={ { background: data.bg_color ? data.bg_color : 'inherit', color: data.color, padding: data.padding } }>
            {/* <div className='divider' /> */}
            <div className='notification__edit__right__title'>
               <textarea
                  ref={ textAreaRefTitle }
                  value={ data.title || '' }
                  name='title'
                  style={ { background: data.bg_color ? data.bg_color : 'inherit' } }
                  onChange={ (e) => {
                     onInputChange('title', e.target.value);
                  } }
               />
            </div>
            {/* <div className='divider' /> */}
            <div className='notification__edit__right__text'>
               {/* <textarea
                  ref={ textAreaRefText }
                  value={ data.text }
                  placeholder='Write description'
                  name='text'
                  style={ { background: data.bg_color ? data.bg_color : 'inherit' } }
                  className='notification__text'
                  onChange={ (e) => {
                     onInputChange('text', e.target.value);
                  } }
               /> */}
               <InlineEditor
                  text={ data.text }
                  slug='random'
                  changeProp={ (e) => onInputChange('text', e) }
                  index={ 1 }
                  sectionIndex={ 2 }
               />
            </div>
            {/* <div className='divider' /> */}
            {data.image && (
               <img src={ data.image } alt='' />
            )}
         </div>
      </div>
   );
};

NotificationEditRight.propTypes = {
   data: PropTypes.object,
   onInputChange: PropTypes.func,
   settings: PropTypes.object,
};

export default NotificationEditRight;
