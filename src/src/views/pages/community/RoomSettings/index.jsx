import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CourseCreatetionForm from 'components/modules/CourseCreatetionForm';
import img1 from 'assets/images/community/illustration.png';
import Tabs from 'components/elements/tabs';
import Switch from 'components/elements/switchNew';
import Select from 'components/elements/SelectNew';

const RoomSettings = ({
   inputs, handleInputChange, categories, errorMessages, 
}) => {
   const [selectedTab, setSelectedTab] = useState('information');
   const tabVariants = [
      { value: 'information', key: 'Room Information', iconName: 'CommunityTabM' },
      { value: 'settings', key: 'Room Access', iconName: 'CommunitySettingsTabM' },
   ];
   const accessVariants = [
      { value: 'open', key: 'Open' },
      { value: 'private', key: 'Private' },
      { value: 'secret', key: 'Secret' },
   ];

   const selectOptions = categories.map((cat) => {
      return { value: cat.id, label: cat.name };
   });

   return (
      <div className='community__room__settings'>
         <div className='community__room__settings__tabs'>
            <Tabs
               variants={ tabVariants }
               selectedVariant={ selectedTab }
               isButton={ false }
               onSelect={ (tab) => setSelectedTab(tab) }
               hasIcon={ true }
            />
         </div>
         {selectedTab === 'information' ? (
            <CourseCreatetionForm
               input={ {
                  errorMessages: errorMessages.name,
                  value: inputs.name,
                  name: 'name',
                  label: 'Room Name',
                  onChange: handleInputChange,
               } }
               area={ {
                  errorMessages: errorMessages.description,
                  value: inputs.description,
                  name: 'description',
                  label: 'Room Description',
                  placeholder: 'Describe the purpose and features of this room',
                  onChange: handleInputChange,
               } }
               hasSelect={ true }
               optional={
                  (
                     <div>
                        <Select
                           options={ selectOptions }
                           value={ inputs.category_room_id }
                           name='category_room_id'
                           onChange={ (name, value) => handleInputChange(name, value) }
                           type='select-medium'
                           label='Room Category'
                           placeholder='Select a Category'
                        />
                     </div>
                  )
               }
               isEdit={ true }
               imgUrl={ img1 }
               title='Room Information'
               placeholder='Give your room a unique name'
            />
         ) : (
            <CourseCreatetionForm
               right={ (
                  <div className='community__room__settings__access'>
                     {/* <Text
                        inner='Room Access'
                        type={ types.regularDefault }
                        size={ sizes.small }
                     /> */}
                     <Switch
                        label={ `Allow members to create ${ inputs.type === 'posts' ? 'posts' : 'events' }` }
                        value={ inputs.allow_create }
                        positionText='left'
                        size='medium'
                        onChange={ (value) => handleInputChange('allow_create', value) }
                     />
                     {/* <Tabs
                        variants={ accessVariants }
                        selectedVariant={ inputs.access_type }
                        onSelect={ (variant) => handleInputChange('access_type', variant) }
                        isFullWidth={ true }
                     /> */}
                  </div>
               ) }
               isEdit={ true }
               imgUrl={ img1 }
               title='Room Access'
            />
         )}
      </div>
   );
};

RoomSettings.propTypes = {
   inputs: PropTypes.object,
   handleInputChange: PropTypes.func,
   categories: PropTypes.array,
   errorMessages: PropTypes.func,
};

export default RoomSettings;
