import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import IconNew from 'components/elements/iconsSize';
import SectionStatus from 'components/modules/designCourse/SectionStatus';
import ModalNew from 'components/elements/ModalNew';
import Select from 'components/elements/SelectNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Button, { THEMES as themes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import DeleteModal from 'components/elements/DeleteModal';
import TimerDesign from 'components/elements/Timer';
import PopoverTriangle from 'components/elements/PopoverTriangle';
import momentTimezone from 'moment-timezone';

const DesignCourseGeneralSectionRow = ({
   section, onChangeStatus, allCourses, onTransfer, copySection, onDeleteSection,
}) => {
   const [isOpenTransferModal, setIsOpenTransferModal] = useState(false);
   const [isOpenDelete, setIsOpenDelete] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   const [courses, setCourses] = useState([]);
   const [transferData, setTransferData] = useState({
      sectionId: section.id,
      courseId: null,
      isChecked: false,
   });

   const handleTransfer = () => {
      onTransfer({
         courseId: transferData.courseId,
         isChecked: transferData.isChecked,
         sectionId: section.id,
      });
      setTransferData({
         courseId: section.course_id,
         isChecked: false,
         sectionId: section.id,
      });
      setIsOpenTransferModal(false);
   };

   const handleInputChange = (name, value) => {
      setTransferData({
         ...transferData,
         [name]: value,
      });
   };

   useEffect(() => {
      const newData = allCourses.map((course) => ({ value: course.id, label: course.name }));
      setCourses(newData);
      setTransferData({ ...transferData, courseId: newData[0]?.value });
   }, [allCourses]);


   const userTimeZone = momentTimezone.tz.guess();
   const dateUserTimeZone = momentTimezone.utc(section.published_date).tz(userTimeZone);
   const dateUserTimeZoneFormat = dateUserTimeZone.format('MMMM DD, YYYY h:mm A');

   return (
      <div className='design__section__row'>
         {isOpenDelete && (
            <DeleteModal
               title={ `Are you sure you want to delete [${ section.name }] section with [${ section.lessons.length }] lessons in it?` }
               deleteText='Delete'
               onDelete={ () => onDeleteSection(section.id) }
               onCancel={ () => {
                  setIsOpenDelete(false);
               } }
            />
         )}
         {isOpenTransferModal && (
            <ModalNew
               onCloseModal={ () => setIsOpenTransferModal(false) }
            >
               <div className='design__section__row__modal'>
                  <div className='design__section__row__modal__top'>
                     <Text
                        inner='Transfer Section'
                        type={ types.medium }
                        size={ sizes.xxlarge }
                     />
                     <Text
                        inner='You can transport your section to any Product, it will be displayed last in the list'
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: '#727978', marginTop: '4px', marginBottom: '24px' } }
                     />
                     {}
                     <Select
                        type='select-large'
                        label='Select Product'
                        name='courseId'
                        placeholder=''
                        options={ courses }
                        onChange={ handleInputChange }
                        value={ transferData.courseId }
                     />
                     <div className='design__section__row__modal__top__checkbox'>
                        <CheckBox
                           checked={ transferData.isChecked }
                           onChange={ (name, value) => handleInputChange('isChecked', value) }
                        />
                        <Text
                           inner='Transfer as a copy'
                           type={ types.regularDefault }
                           size={ sizes.medium }
                        />
                     </div>
                  </div>
                  <div className='design__section__row__modal__bottom'>
                     <Button
                        theme={ themes.secondary }
                        onClick={ () => {
                           setTransferData({});
                           setIsOpenTransferModal(false);
                        } }
                        text='Cancel'
                        size={ btnSizes.large120 }
                     />
                     <Button
                        onClick={ () => handleTransfer() }
                        disabled={ !courses.length }
                        text='Transfer'
                        size={ btnSizes.large120 }
                     />
                  </div>
               </div>
            </ModalNew>
         )}
         <div className='design__section__row__left'>
            <Text
               inner='You Selected:'
               type={ types.regular148 }
               size={ sizes.medium }
               style={ { color: '#727978' } }
            />
            <Text
               inner={ section.name }
               type={ types.regular148 }
               size={ sizes.medium }
            />
         </div>
         <div className='design__section__row__right'>
            <div
               className='design__section__row__right__timer'
               onMouseEnter={ () => {
                  setIsHovered(true);
               } }
               onMouseLeave={ () => {
                  setIsHovered(false);
               } }
            >
               {
                  !!section.status && section.status === '2' && (
                     <TimerDesign
                        time={ new Date(section.published_date) }
                        onExpire={ () => onChangeStatus(1) }
                     />
                  )
               }
               {isHovered && (
                  <PopoverTriangle
                     hoverText={ `Release Date ${ dateUserTimeZoneFormat }` }
                  />
               )}
            </div>

            <div className='design__section__row__right__comments'>
               <IconNew name='CommentProgramM' />
               <Text
                  inner={ section.comments_count || 0 }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
            <div className='design__section__row__right__line' />
            <div className='design__section__row__right__status'>
               <SectionStatus
                  status={ Number.parseFloat(section.status) }
                  onChangeStatus={ (status, data) => onChangeStatus(status, data) }
               />
            </div>
            <div
               className='design__section__row__right__transfer'
               role='presentation'
               onClick={ () => setIsOpenTransferModal(true) }
            >
               <IconNew name='ArrowTopRightProgramM' />
            </div>
            <div
               className='design__section__row__right__transfer'
               role='presentation'
               onClick={ () => copySection(section.id) }
            >
               <IconNew name='CopyProgramM' />
            </div>
            <div
               className='design__section__row__right__transfer'
               role='presentation'
               onClick={ () => {
                  setIsOpenDelete(true);
               } }
            >
               <IconNew name='DeleteSectionProgramM' />
            </div>
         </div>
      </div>
   );
};

DesignCourseGeneralSectionRow.propTypes = {
   section: PropTypes.object,
   onChangeStatus: PropTypes.func,
   copySection: PropTypes.func,
   allCourses: PropTypes.array,
   onTransfer: PropTypes.func,
   onDeleteSection: PropTypes.func,
};

export default DesignCourseGeneralSectionRow;
