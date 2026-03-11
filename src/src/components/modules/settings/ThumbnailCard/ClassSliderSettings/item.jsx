import React from 'react';
import PropTypes from 'prop-types';
import DragAndDropUploadImage from 'components/modules/dragAndDropUploadImage';
import Select from 'components/elements/form/Select';
import Icon from 'components/elements/Icon';
import {
   sortableHandle,
} from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => (
   <Icon name='Dragdrop' />
));
function ClassSliderSettingsItem({
   allCourses, onChange, src, selectedCourse, onRemove,
}) {
   return (
      <div style={ { zIndex: 9999 } }>
         <div className='flex-2 searchFilter__input flex'>
            <div className='m-r-m' style={ { display: 'flex', alignItems: 'center', width: 32 } }>
               <DragHandle />
            </div>
            <Select
               style={ { height: '40px' } }
               id='course'
               placeholder='Choose class for your slider'
               options={ allCourses }
               name='advancedFilterOption'
               onChange={ (name, value) => onChange('course_id', value) }
               icon='Down'
               selectedValue={ selectedCourse }
            />
            {(src || selectedCourse) && (
               <div className='course_slider_delete' role='presentation' onClick={ (e) => onRemove(e) } title='Delete'>
                  <Icon name='Delete' />
               </div>
            )}
         </div>

         <DragAndDropUploadImage onChange={ img => onChange('src', img) } src={ src } crop='1920x1080' />
      </div>
   );
}

ClassSliderSettingsItem.propTypes = {
   allCourses: PropTypes.array,
   onChange: PropTypes.func,
   onRemove: PropTypes.func,
   src: PropTypes.string,
   selectedCourse: PropTypes.string,
};

export default ClassSliderSettingsItem;
