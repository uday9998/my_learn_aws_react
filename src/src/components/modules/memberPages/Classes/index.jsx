import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import emptyState from 'assets/images/schoolRoom/empty_state_product.png';
import ClassesCourseComponents from './ClassesComponents/Course';
import './index.scss';
import CourseModules from './ClassesComponents/Modules';

const MemberClassesPage = ({
   classes, onPause, member, removeMemberCourse, filterMemberClasses, sort,
}) => {
   const [selectedCourse, setSelectedCourse] = useState({});
   return (
      <div className='member__classes'>
         {selectedCourse.name ? (
            <CourseModules
               onPause={ () => onPause(member.id, selectedCourse.id) }
               onDelete={ () => {
                  removeMemberCourse(member.id, selectedCourse.id);
                  setSelectedCourse({});
               } }
               goBack={ () => setSelectedCourse({}) }
               course={ selectedCourse }
            />
         ) : (
            <div className='member__classes__wrapper'>
               <div className='member__classes__wrapper__top'>
                  <Text
                     inner={ `${ classes.length > 1 ? 'Products' : classes.length === 1 ? `${ classes.length } Product` : '' }` }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                  />
                  <BaseButton
                     text={ `Sort By: ${ sort === 0 ? 'Latest' : 'New' }` }
                     theme={ btnTheme.secondary }
                     iconName='SortNew'
                     isIconRight={ true }
                     onClick={ () => {
                        filterMemberClasses(member.id, sort === 0 ? 1 : 0);
                     } }
                  />
               </div>
               {!classes.length ? (
                  <div className='member__classes__wrapper__founds'>
                     <Text
                        inner='No Products yet'
                        style={ { color: '#727978', textAlign: 'center' } }
                        type={ txtTypes.mediumLargeGrey }
                        size={ txtSizes.new_size_28 }
                     />
                     <img src={ emptyState } alt='No Products Yet' />
                  </div>
               ) : ''}
               <div className='member__classes__lists'>
                  {classes.map((course) => {
                     return (
                        <ClassesCourseComponents
                           onSelect={ (selected) => setSelectedCourse(selected) }
                           course={ course }
                           onPause={ onPause }
                           key={ uniqueId() }
                           onDelete={ removeMemberCourse }
                           memberId={ member.id }
                        />
                     );
                  })}
               </div>
            </div>
         )}
      </div>
   );
};

MemberClassesPage.propTypes = {
   classes: PropTypes.array,
   member: PropTypes.object,
   filterMemberClasses: PropTypes.func,
   sort: PropTypes.number,
   onPause: PropTypes.func,
   removeMemberCourse: PropTypes.func,
};

export default MemberClassesPage;
