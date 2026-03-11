import React from 'react';
import PropTypes from 'prop-types';
import SimpleStatus from 'components/elements/SimpleStatus';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import './index.scss';

const MyAccountCourseTemplate = ({
   title, description, author, progress, lessonsCount, image, url, type,
}) => {
   const openCourse = () => {
      if (type) {
         window.open('/portal/membership', '_blank');
      }
      window.open(`/programs/${ url }`, '_blank');
   };
   return (
      <div className='my__account__course' role='presentation' onClick={ () => openCourse() }>
         <div className='my__account__course__top'>
            <img src={ image } alt='' />
            {!type && (
               <div className='my__account__course__top__status'>
                  <SimpleStatus
                     text={ progress === 0 ? 'New' : progress === 100 ? 'Complete' : 'In Progress' }
                     color='navy'
                  />
               </div>
            )}
            <div className='my__account__course__top__lessonsCount'>
               <TextWithIcon
                  inner={ lessonsCount }
                  iconName='LessonMyAccountS'
                  isIconRight={ false }
                  type={ types.medium140 }
                  size={ sizes.xx_small }
                  style={ { color: '#fff' } }
               />
            </div>
         </div>
         <div className='my__account__course__bottom'>
            <Text
               inner={ title }
               type={ types.medium153 }
               size={ sizes.large }
            />
            <Text
               inner={ description }
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#444C4B' } }
               className='course_desc'
            />
            <div className='my__account__course__bottom__info'>
               <div className='my__account__course__bottom__author'>
                  <img src={ author.picture_src } alt='' />
                  <Text
                     inner={ author.title }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
               {!type && (
                  <div className='my__account__course__bottom__progress'>
                     <Text
                        inner={ `${ progress }%` }
                        type={ types.regularDefault }
                        size={ sizes.small }
                        style={ { color: 'var(--buttonBgcolor)' } }
                     />

                     <div className='my__account__course__bottom__progress__bar'>
                        <div
                           className='my__account__course__bottom__progress__bar__pr'
                           style={ { width: `${ progress }%` } }
                        />
                     </div>

                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

MyAccountCourseTemplate.propTypes = {
   title: PropTypes.string,
   description: PropTypes.string,
   author: PropTypes.object,
   progress: PropTypes.number,
   lessonsCount: PropTypes.number,
   image: PropTypes.string,
   url: PropTypes.string,
   type: PropTypes.bool,
};

export default MyAccountCourseTemplate;
