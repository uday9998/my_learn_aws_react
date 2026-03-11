import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import { SliceAndConnectText } from 'utils/getSplitedText';
import SectionSortableList from 'components/modules/reorderLessons/SectionSortableList';
import Icon from 'components/elements/Icon';
import SectionEmptyState from '../DesignCourseGeneralEmptySection';

const DesignCourseMediaSections = ({
   sections, selectedSection, setSelectedSection, onReorder, onSelecteSectionSettings,
}) => {
   return (
      <div className='design__course__media__sections'>
         <div className='design__course__media__sections__top'>
            <Text
               inner='Lessons'
               size={ sizes.xxlarge }
               type={ types.regularDefault }
               miniText={ `${ sections[0].lessons.length }` }
            />
            {!!sections[0].lessons.length && (
               <div role='presentation' onClick={ () => {} }>
                  <TextWithIcon
                     iconName='plusSectionProgramM'
                     inner='Add Section'
                     type={ types.regularDefaultSmall }
                     size={ sizes.small }
                     style={ { color: '#24554E' } }
                  />
               </div>
            )}
         </div>
         {sections[0].lessons.length ? (
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
                                 <IconNew name='OpenedFolderProgramM' />
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
                              <IconNew name='ClosedFolderProgramM' />
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
         ) : (
            <SectionEmptyState
               openModal={ () => {} }
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
};

export default DesignCourseMediaSections;
