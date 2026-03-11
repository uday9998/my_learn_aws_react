import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import './index.scss';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Switch from 'components/elements/switchNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import SortButton from 'components/elements/buttons/SortButton';
import IconNew from 'components/elements/iconsSize';
import ReactTooltip from 'react-tooltip';
import { findVideoMembershipCheckedOrNo } from 'utils/products';
import {
   getRefunds, runReportsJob,
} from 'api';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { duplicateCourse } from 'state/modules/designCourse/courses/actions';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';
import { toast } from 'react-toastify';

const options = {
   recently_updated: 'Recently Updated',
   newest: 'Newest',
   oldest: 'Oldest',
   most_members: 'Most members',
   least_members: 'Least Members',
   A_Z: 'Name A to Z',
   Z_A: 'Name Z to A',
};

const statusOptions = {
   all: 'None',
   published: 'Published',
   unpublished: 'Unpublished',
   communities: 'Community',
   courses: 'Online Course',
   program: 'Video Membership',
   drip: 'Drip',
};

const CoursesFilter = ({
   courses, isMultiSelected,
   searchValue, setSearchValue, checkedItemsLength, onCheck, setIsMultiSelected,
   onFilter, coursesSortingValue, onRemoveSelected, onStatusFilter, filter,
   onAcceptRemove, totalCourses, isMob, isMobSearchOpen, isDeleteDisabled, selectedCoursesIds,
}) => {
   const socket = useRef(null);
   const { permissions } = useSelector(siteInfoSelector);
   const [disconnect, setDisconnect] = useState(false);
   const dispatch = useDispatch();
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');
   const [disableDuplicate, setDisableDuplicate] = useState(false);
   let courseCount = `${ courses.length } Products`;
   if (courses.length < totalCourses) {
      if (isMob) {
         courseCount = `${ courses.length } Products`;
      } else {
         courseCount = `${ courses.length } of ${ totalCourses } Products`;
      }
   }

   useEffect(() => {
      if (selectedCoursesIds.length) {
         setDisableDuplicate(findVideoMembershipCheckedOrNo(selectedCoursesIds, courses));
      } else {
         setDisableDuplicate(false);
      }
   }, [selectedCoursesIds]);

   const handleDuplicate = () => {
      if (!Array.isArray(permissions)) {
         if (courses.length < permissions.course.courses_count && courses.length + checkedItemsLength <= permissions.course.courses_count) {
            onAcceptRemove(true);
         } else {
            setShowPopup(true);
            setPopupTitle('Product');
         }
      } else {
         onAcceptRemove(true);
      }
   };

   useEffect(() => {
      if (isMultiSelected) {
         const bindSocketEvents = () => {
            socket.current.on('connect', () => {
               socket.current.emit('subscribe');
            });
   
            socket.current.on('courses.multi-duplicate', (data) => {
               dispatch(duplicateCourse(data.course));
               if (data.disconnect) {
                  setDisconnect(data.disconnect);
               }
            });
         };
         const socketUrl = `${ process.env.REACT_APP_SOCKET_ENDPOINT }?uuid=ec9c125d65ad415fb5b14ba158eed7cf`;
         socket.current = socketIOClient(socketUrl);
         bindSocketEvents();
      } else if (disconnect && socket.current) {
         socket.current.disconnect();
      }
   }, [isMultiSelected, disconnect]); 

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className='courses__filter'>
         {
            showPopup && createPortal(<PricingPopup popupTitle={ popupTitle } handleClosePopup={ handleClosePopup } />, document.body)
         }
         {((isMobSearchOpen && isMob) || !isMob) && (
            <div className='courses__filter__search'>
               <Input
                  value={ searchValue }
                  // onKeyPress={ () => searchOnEnter({ name: searchValue }) }
                  // onClearSearchValue={ () => onClearSearch() }
                  type='search'
                  name='searchField'
                  placeholder='Search'
                  onChange={ (name, value) => setSearchValue(name, value) }
               />
            </div>
         )}
         <div className='courses__filter__bottom'>
            <div className='courses__filter__bottom__left'>
               <div className={ isMultiSelected ? 'courses__filter__count courses__filter__count__selected' : 'courses__filter__count' }>
                  {isMultiSelected ? (
                     <CheckBox
                        iconType='asd'
                        checked={ checkedItemsLength === courses.length }
                        onChange={ onCheck }
                     />
                  ) : (
                     <div />
                  )}
                  <Text
                     inner={ `${ isMultiSelected ? `${ checkedItemsLength }/` : '' }${ courseCount }` }
                     type={ TextType.regularDefault }
                     size={ TextSize.small }
                  />
               </div>
               <Switch
                  value={ isMultiSelected }
                  onChange={ setIsMultiSelected }
                  positionText='right'
                  label='Multiselect'
                  size='medium'
               />
               {isMultiSelected && (
                  <div className='courses__filter__bottom__actions'>
                     <Text
                        inner='Actions: '
                        type={ TextType.regularDefault }
                        size={ TextSize.small }
                     />
                     <div
                        style={ {
                           opacity: disableDuplicate ? 0.4 : 1,
                        } }
                        className='courses__filter__bottom__actions__duplicate'
                        role='presentation'
                        data-tip={ disableDuplicate ? 'You cannot duplicate this product' : undefined }
                        onClick={ () => (checkedItemsLength > 0 && !disableDuplicate ? handleDuplicate() : { }) }>
                        <IconNew name='DuplicateMediaM' />
                        {
                           disableDuplicate && <ReactTooltip />
                        }
                     </div>
                     <div
                        className={ `courses__filter__bottom__actions__delete ${ isDeleteDisabled ? 'disabled tooltip' : '' } ` }
                        role='presentation'
                        onClick={ () => (checkedItemsLength > 0 && !isDeleteDisabled ? onRemoveSelected() : { }) }
                        data-tip={ isDeleteDisabled ? 'You can have only one video membership' : undefined }
                     >
                        <IconNew name='CertificatesDeleteS' />
                        {
                           isDeleteDisabled && (
                              <ReactTooltip />
                           )
                        }
                     </div>
                  </div>
               )}
            </div>
            <div className='courses__filters'>
               {!isMultiSelected && (
                  <SortButton onFilter={ onStatusFilter } value={ filter } options={ statusOptions } filterType='Filter' iconName='FilterM' isMob={ isMob } isNewIcon={ true } />
               )}
               {!isMultiSelected && (
                  <SortButton onFilter={ onFilter } value={ coursesSortingValue } options={ options } isMob={ isMob } />
               )}
            </div>
         </div>
      </div>
   );
};


CoursesFilter.propTypes = {
   courses: PropTypes.array,
   selectedCoursesIds: PropTypes.array,
   coursesSortingValue: PropTypes.any,
   onFilter: PropTypes.func,
   setSearchValue: PropTypes.func,
   searchValue: PropTypes.string,
   isMultiSelected: PropTypes.bool,
   setIsMultiSelected: PropTypes.func,
   checkedItemsLength: PropTypes.any,
   onCheck: PropTypes.func,
   onRemoveSelected: PropTypes.func,
   onStatusFilter: PropTypes.func,
   filter: PropTypes.string,
   onAcceptRemove: PropTypes.func,
   totalCourses: PropTypes.number,
   isMob: PropTypes.bool,
   isMobSearchOpen: PropTypes.bool,
   isDeleteDisabled: PropTypes.bool,
};

export default CoursesFilter;
