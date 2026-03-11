import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import { SliceAndConnectText } from 'utils/getSplitedText';
import SectionSortableList from 'components/modules/reorderLessons/SectionSortableList';
import Icon from 'components/elements/Icon';
import GeneratorModal from 'components/elements/GeneratorModal';
import SectionEdit from './SectionEdit';
import SectionEmptyState from '../DesignCourseGeneralEmptySection';

const DesignCourseMediaSections = ({
   sections, onCreateSection, selectedSection, setSelectedSection, onReorder, onSelecteSectionSettings,
   handleChangeOpenSection, isOpenCreateSection, isMobile,
}) => {
   const [openModal, setOpenModal] = useState(
      {
         name: '',
         value: '',
         isOpen: false,
      });
   const [name, setName] = useState('');
   const [isOpen, setIsOpen] = useState(true);
   const [errorMessages, setErrorMessages] = useState({});

   const removeErrorMessage = (fieldName) => {
      setErrorMessages(prev => ({
         ...prev,
         [fieldName]: []
      }));
   };

   const addErrorMessages = (newErrors) => {
      setErrorMessages(prev => ({
         ...prev,
         ...newErrors,
      }));
   };

   const onClose = () => {
      handleChangeOpenSection(false);
      setName('');
   };

   const onAccept = () => {
      if (!name.trim()) {
         addErrorMessages({ name: ['Section name is required'] });
         return;
      }

      onCreateSection(name);
      setName('');
      handleChangeOpenSection(false);
   };

   const changeSectionName = (name, value) => {
      if (errorMessages[name]?.length) {
         removeErrorMessage(name);
      }

      setName(value);
   };

   return (
      <div
         className={ `design__course__media__sections ${ isOpen ? 'opened' : 'closed' }` }
      >
         <div className='design__course__media__sections__top'>
            <Text
               inner='Sections'
               size={ sizes.xxlarge }
               type={ types.regularDefault }
               miniText={ `${ sections.length }` }
            />
            {!!sections.length && (
               <div role='presentation' onClick={ () => handleChangeOpenSection(true) }>
                  <TextWithIcon
                     iconName='plusSectionProgramM'
                     inner='Add Section'
                     type={ types.regularDefaultSmall }
                     size={ sizes.small }
                     style={ { color: '#24554E' } }
                  />
               </div>
            )}
            {
               isMobile && !!sections.length && (
                  <div
                     className='design__course__media__sections__top__switcher'
                     role='presentation'
                     onClick={ () => setIsOpen(!isOpen) }
                  >
                     <IconNew name='ChevronLeftL' style={ !isOpen ? { transform: 'rotate(180deg)' } : {} } />
                  </div>
               )
            }
         </div>

         {isOpenCreateSection && (
            <SectionEdit
               onClose={ onClose }
               onAccept={ onAccept }
               changeSectionName={ changeSectionName }
               name={ name }
               setOpenModal={ setOpenModal }
               errorMessages={ errorMessages }
            />
         )}

         {!!sections.length && (
            <div className='design__course__media__sections__content'>
               <SectionSortableList sections={ sections } onChange={ onReorder }>
                  {(provided, snapshot, section, getItemStyle) => {
                     if (selectedSection && section.id === selectedSection.id) {
                        return (
                           <div
                              ref={ provided.innerRef }
                              { ...provided.draggableProps }
                              className='design__course__media__section design__course__media__section__active'
                              style={ {
                                 background: '#36796F',
                                 ...(getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                 )),
                              } }
                           >
                              <div className='left'>
                                 <div className='section__dragHandle'>
                                    <span
                                       className='dragHandleIcon'
                                       { ...provided.dragHandleProps }
                                    >
                                       <Icon name='Dragdrop' />
                                    </span>
                                 </div>
                                 <div className='section__folderIcon'>
                                    <IconNew name='OpenedFolderProgramM' />
                                 </div>
                                 <Text
                                    inner={ SliceAndConnectText(section.name, 30) }
                                    type={ types.regularDefault }
                                    size={ sizes.small }
                                    style={ { color: '#fff' } }
                                 />
                              </div>
                              <div className='right'>
                                 <div
                                    role='presentation'
                                    onClick={ () => onSelecteSectionSettings(section) }
                                    className='section__settings__icon'
                                 >
                                    <IconNew name='SectionSettingsM' />
                                 </div>
                                 <div className='right__comments'>
                                    <IconNew name='CommentsProgramS' />
                                    <Text
                                       inner={ section.comments_count >= 0 ? section.comments_count : 0 }
                                       type={ types.medium150 }
                                       size={ sizes.xsmall }
                                    />
                                 </div>
                                 <div className='right__button'>
                                    <IconNew name='ArrowSectionProgramM' color='#fff' />
                                 </div>
                              </div>
                           </div>
                        );
                     }
                     return (
                        <div
                           ref={ provided.innerRef }
                           { ...provided.draggableProps }
                           role='presentation'
                           onClick={ () => setSelectedSection(section) }
                           className='design__course__media__section'
                           style={ {
                              ...(getItemStyle(
                                 snapshot.isDragging,
                                 provided.draggableProps.style
                              )),
                              cursor: 'pointer',
                           } }
                        >
                           <div className='left'>
                              <div className='section__dragHandle'>
                                 <span
                                    className='dragHandleIcon'
                                    { ...provided.dragHandleProps }
                                 >
                                    <Icon name='Dragdrop' />
                                 </span>
                              </div>
                              <div className='section__folderIcon'>
                                 <IconNew name='ClosedFolderProgramM' />
                              </div>
                              <Text
                                 inner={ SliceAndConnectText(section.name, 30) }
                                 type={ types.regularDefault }
                                 size={ sizes.small }
                              />
                           </div>
                           <div className='right'>
                              <div
                                 role='presentation'
                                 onClick={ () => onSelecteSectionSettings(section) }
                                 className='section__settings__icon'
                              >
                                 <IconNew name='SectionSettingsM' />
                              </div>
                              <div className='right__comments' style={ { border: '1px solid #E7E9E9' } }>
                                 <IconNew name='CommentsProgramS' />
                                 <Text
                                    inner={ section.comments_count >= 0 ? section.comments_count : 0 }
                                    type={ types.medium150 }
                                    size={ sizes.xsmall }
                                 />
                              </div>
                              <div className='right__button' role='presentation' onClick={ () => setSelectedSection(section) }>
                                 <IconNew name='ArrowSectionProgramM' />
                              </div>
                           </div>
                        </div>
                     );
                  }}
               </SectionSortableList>
            </div>
         )}

         {!sections.length && !isOpenCreateSection && (
            <SectionEmptyState
               openModal={ () => handleChangeOpenSection(true) }
            />
         )}
         {openModal.isOpen && (
            <GeneratorModal
               name={ openModal.name }
               value={ openModal.value }
               setOpenModal={ setOpenModal }
               title='Section'
               setData={ setName }
            />
         )}

      </div>
   );
};

DesignCourseMediaSections.propTypes = {
   sections: PropTypes.array,
   onCreateSection: PropTypes.func,
   selectedSection: PropTypes.object,
   onReorder: PropTypes.func,
   onSelecteSectionSettings: PropTypes.func,
   setSelectedSection: PropTypes.func,
   handleChangeOpenSection: PropTypes.func,
   isOpenCreateSection: PropTypes.bool,
   isMobile: PropTypes.bool,
};

export default DesignCourseMediaSections;
