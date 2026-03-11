
import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/elements/TextNew';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import CheckBox from 'components/elements/form/CheckBoxNew';
import './index.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Icon from 'components/elements/Icon';
import { communityButtonColors } from 'utils/communityButtonColors';

const ProductList = ({
   coursesData, checkedDataIds, handleCheck, role, community,
}) => {
   const history = useHistory();

   const handleNavigateToCourse = (course) => {
      if (course.type === '1') {
         history.push('/portal/membership');
      } else {
         history.push(`/programs/${ course.url }`);
      }
   };

   return (
      <div className='communityProducts__items'>
         {
            coursesData.length && coursesData.map(course => {
               return (
                  <div className='course__card'>
                     <div
                        style={ {
                           backgroundImage: `url(${ course.thumbnail_image })`,
                        } }
                        className='top__wrapper'>
                        <div className='image__bottom__wrapper'>
                           {role === 'admin' && (
                              <CheckBox
                                 checked={ checkedDataIds.includes(course.id) }
                                 onChange={ () => handleCheck(course.id) }
                              />
                           )}
                        </div>
                        <div className='image__bottom__wrapper'>
                           {role === 'admin' && (<div />)}
                           {role !== 'admin' && (<div className='purchased__course__lessons__count'><Icon name={ course.joined ? 'Free' : 'Lock' } color='#fff' /></div>)}
                           <div className='purchased__course__lessons__count'>
                              <IconNew name={ course.type === '1' ? 'VideoQueueS' : 'LessonsCount' } color='#fff' />
                              <Text 
                                 inner={ course.lessons_count > 1 ? `${ course.lessons_count } ${ course.type === '1' ? 'Videos' : 'Lessons' }` : `${ course.lessons_count } ${ course.type === '1' ? 'Video' : 'Lesson' }` }
                              />
                           </div>
                        </div>
                     </div>
                     <div className='bottom__wrapper'>
                        <div className='course__name__wrapper'>
                           <Text 
                              inner={ course.name }
                           />
                        </div>
                        {course.type === '1' && (
                           <div className='widget_membership'>
                              <Text
                                 inner='Membership'
                              />
                           </div>
                        )}
                        {course.type === '0' && (
                           <div className='widget'>
                              <Text
                                 inner='Course'
                              />
                           </div>
                        )}
                        <div className='description__wrapper'>
                           <Text 
                              inner={ course.description }
                           />
                        </div>
                        <div className='button__wrapper'>
                           <BaseButton 
                              text='Open'
                              theme={ themes.primary }
                              onClick={ () => handleNavigateToCourse(course) }
                              style={ communityButtonColors(community) }
                           />
                        </div>
                     </div>
                  </div>
               );   
            })
         }
      </div>
   );
};

ProductList.propTypes = {
   coursesData: PropTypes.array,
   checkedDataIds: PropTypes.array, 
   handleCheck: PropTypes.func,
   role: PropTypes.string,
   community: PropTypes.object,
};

export default ProductList;