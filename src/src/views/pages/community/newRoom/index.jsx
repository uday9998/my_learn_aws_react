import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import img1 from 'assets/images/community/room.png';
import CourseCreatetionForm from 'components/modules/CourseCreatetionForm';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Tabs from 'components/elements/tabs';
import Input from 'components/elements/inputNew';
import MultiSelect from 'components/elements/multiSelectNew';
import Switch from 'components/elements/switchNew';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import { communityButtonColors, communitySecondaryButtonColors } from 'utils/communityButtonColors';
import Select from 'components/elements/SelectNew';

const NewRoom = ({
   handleSumbit, step, setStep, options, isOpenMembersSavedState, savedDataState, community, categories,
}) => {
   const [data, setData] = savedDataState;
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState(false);
   const { permissions } = useSelector(siteInfoSelector);
   const handleInputChange = (name, value) => {
      if (!Array.isArray(permissions) && name !== 'allow_create' && name !== 'email' && name !== 'course_id' && name !== 'user_name') {
         if (step === 2) {
            if ((value === 'events' && permissions.commmunities.events) || value === 'posts') {
               setData({
                  ...data,
                  [name]: value,
               });
            } else {
               setPopupTitle('Need To Create Event? ');
               setShowPopup(true);
            }
         } else {
            setData({
               ...data,
               [name]: value,
            });
         }
      } else {
         setData({
            ...data,
            [name]: value,
         });
      }
   };
   const typeVariants = [
      { value: 'posts', key: 'Posts' },
      { value: 'events', key: 'Events' },
   ];
   // const accessVariants = [
   //    { value: 'open', key: 'Open' },
   //    { value: 'private', key: 'Private' },
   //    { value: 'secret', key: 'Secret' },
   // ];
   const [isOpenMembers, setIsOpenMembers] = useState(isOpenMembersSavedState[0]);

   useEffect(() => {
      isOpenMembersSavedState[1](isOpenMembers);
   }, [isOpenMembers]);

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   const selectOptions = categories.map((cat) => {
      return { value: cat.id, label: cat.name };
   });
   
   return (
      <div className='room__creation'>
         {
            showPopup && createPortal(<PricingPopup 
               isEvent={ true }
               handleClosePopup={ handleClosePopup }
               popupTitle={ popupTitle }
            />, document.body)
         }
         {step === 1 && (
            <CourseCreatetionForm
               title='Room Information'
               imgUrl={ img1 }
               placeholder='Give your room a unique name'
               input={ {
                  name: 'name',
                  label: 'Room Name',
                  value: data.name,
                  onChange: handleInputChange,
               } }
               area={ {
                  name: 'description',
                  label: 'Room Description',
                  placeholder: 'Describe the purpose and features of this room',
                  value: data.description,
                  onChange: handleInputChange,
               } }
               primaryButton={ {
                  text: 'Next Step',
                  onClick: () => setStep(2),
                  style: communityButtonColors(community), 
               } }
               hasSelect={ true }
               optional={
                  (
                     <div>
                        <Select
                           options={ selectOptions }
                           value={ data.category_room_id }
                           name='category_room_id'
                           onChange={ (name, value) => handleInputChange(name, value) }
                           type='select-medium'
                           label='Room Category'
                           placeholder='Select a Category'
                        />
                     </div>
                  )
               }
            />
         )}
         {step === 2 && (
            <CourseCreatetionForm
               title='Room Details'
               imgUrl={ img1 }
               right={ (
                  <div className='room__types'>
                     <div className='room__types__tab'>
                        {/* <Text
                           inner='Room Access'
                           type={ types.regularDefault }
                           size={ sizes.small }
                        /> */}
                        {/* <Tabs
                           variants={ typeVariants }
                           selectedVariant={ data.type }
                           onSelect={ (variant) => handleInputChange('type', variant) }
                           isFullWidth={ true }
                        /> */}
                        <Switch
                           label={ `Allow members to create ${ data.type === 'posts' ? 'posts' : 'events' }` }
                           value={ data.allow_create }
                           positionText='left'
                           size='medium'
                           onChange={ (value) => handleInputChange('allow_create', value) }
                        />
                     </div>
                     {/* <div className='room__types__tab'>
                        <Text
                           inner='Room Access'
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                        <Tabs
                           variants={ accessVariants }
                           selectedVariant={ data.access_type }
                           onSelect={ (variant) => handleInputChange('access_type', variant) }
                           isFullWidth={ true }
                        />
                     </div> */}
                     {!isOpenMembers ? (
                        <TextWithIcon
                           iconName='plusSelectorM'
                           inner='Add members (Optional)'
                           type={ types.regularDefaultSmall }
                           size={ sizes.small }
                           style={ { color: '#24554E' } }
                           onClick={ () => {
                              setIsOpenMembers(true);
                           } }
                           generalStyles={ {
                              cursor: 'pointer',
                           } }
                        />
                     ) : (
                        <div className='room__types__member'>
                           <div className='room__types__member__multi'>
                              <Text
                                 inner='Select Product'
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                              />
                              <MultiSelect
                                 values={ data.course_id || [] }
                                 options={ options }
                                 placeholder='Select product'
                                 onRemove={ (value) => handleInputChange('course_id', (data.course_id.filter((classId) => classId !== value))) }
                                 onAdd={ (value) => handleInputChange('course_id', ([...(data.course_id || []), value])) }
                              />
                           </div>
                           <div className='room__types__member__or'>
                              <div className='room__types__member__or__line' />
                              <Text
                                 inner='or'
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                                 style={ { color: '#727978' } }
                              />
                              <div className='room__types__member__or__line' />
                           </div>
                           <Input
                              name='user_name'
                              onChange={ handleInputChange }
                              value={ data.user_name }
                              label='Name'
                              placeholder='Enter your name'
                           /> 
                           <Input
                              value={ data.email }
                              onChange={ handleInputChange }
                              name='email'
                              label='Email address'
                              placeholder='Enter your email address'
                           />
                        </div>
                     )}
                  </div>
               ) }
               secondaryButton={ {
                  text: 'Previous',
                  onClick: () => setStep(1),
                  style: communitySecondaryButtonColors(community), 
               } }
               primaryButton={ {
                  text: 'Create',
                  onClick: () => handleSumbit(data),
                  style: communityButtonColors(community), 
               } }
            />
         )}
      </div>
   );
};

NewRoom.propTypes = {
   handleSumbit: PropTypes.func,
   step: PropTypes.number,
   setStep: PropTypes.func,
   options: PropTypes.array,
   isOpenMembersSavedState: PropTypes.array,
   savedDataState: PropTypes.array,
   community: PropTypes.object,
   categories: PropTypes.array,
};

export default NewRoom;
