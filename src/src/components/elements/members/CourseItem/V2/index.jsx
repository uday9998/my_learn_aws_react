import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';

const CourseItemV2 = ({ course }) => {
   const {
      name, progress, activity, initialDate, signCount,
   } = course;
   return (
      <div className='courseItem__v-2'>
         <div className='courseItem__left'>
            <div className='courseItem__item'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner={ name }
               />
               <div className='courseItem__under'>
                  <Text
                     type={ TextType.normal }
                     inner={ `${ activity }` }
                     style={ { fontSize: '12px' } }
                     color='#c2cedb'
                  />
               </div>
            </div>
            <div className='courseItem__item'>
               <Text
                  type={ TextType.normal }
                  inner='Active'
                  color='#7cb740'
                  style={ { backgroundColor: 'rgba(124, 183, 64, 0.1)', padding: '3px', fontSize: '12px' } }
               />
               <div className='courseItem__under'>
                  <Text
                     type={ TextType.normal }
                     inner={ `${ signCount }Sign in Total` }
                     style={ { fontSize: '12px' } }
                     color='#c2cedb'
                  />
               </div>
            </div>
            <div className='courseItem__item courseItem__progress'>
               <Icon name='CircleGraph' />
               <div className=''>
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.small }
                     inner={ `${ progress }%` }
                  />
                  <Text
                     type={ TextType.normal }
                     inner={ `User since ${ initialDate }` }
                     style={ { fontSize: '12px' } }
                     color='#c2cedb'
                  />
               </div>
            </div>
         </div>
         <div className='courseItem__right'>
            <Icon name='Pause' />
            <div className='m-l-exs' />
            <Icon name='Close' />
         </div>
      </div>
   );
};

CourseItemV2.propTypes = {
   course: PropTypes.object,
};
CourseItemV2.defaultProps = {
   course: {},
};

export default CourseItemV2;
