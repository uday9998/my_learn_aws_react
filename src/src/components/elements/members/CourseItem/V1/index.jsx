import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import ProgressLine from 'components/elements/progressBar/ProgressLine';
import moment from 'moment';

const CourseItemV1 = ({
   course, lastLogin, handlePauseCurrentMemberCourse, handleDeleteCurrentMemberCourse,
}) => {
   const {
      // eslint-disable-next-line camelcase
      name, progress_percentage, pivot, created_at,
   } = course;

   function courseStatus(status) {
      let coursestatus;
      switch (status) {
         case 1:
            coursestatus = 'Active';
            break;
         case 2:
            coursestatus = 'Paused';
            break;
         default:
            coursestatus = 'Deactive';
      }
      return coursestatus;
   }

   function lastActive(lastlogin) {
      const date2 = new Date();
      const date1 = new Date(moment(lastlogin).format('MM/DD/YYYY HH:mm:ss'));
      const differenceInTime = date2.getTime() - date1.getTime();

      // eslint-disable-next-line radix
      let differenceInDay = parseInt(differenceInTime / (1000 * 3600 * 24));

      switch (differenceInDay) {
         case 0:
            differenceInDay = 'Today';
            break;
         case 1:
            differenceInDay = 'Yesterday';
            break;
         default:
            differenceInDay = `${ differenceInDay } days ago`;
      }

      return differenceInDay;
   }

   return (

      <div className='courseItem__v-1'>
         <div className='courseItem__left'>
            <div className='courseItem__item'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner={ name }
               />
               <div className='courseItem__under courseItem__progress'>
                  <ProgressLine
                     // eslint-disable-next-line camelcase
                     progress={ progress_percentage }
                     color='#006dff'
                     backColor='#c2cedb'
                     height='7px'
                  />
                  <div className='m-l-exs' />
                  <Text
                     type={ TextType.normal }
                     // eslint-disable-next-line camelcase
                     inner={ `${ progress_percentage }%` }
                     style={ { fontSize: '12px' } }
                     color='#c2cedb'
                  />
               </div>
            </div>

            <div className='courseItem__item'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner={ lastLogin ? (`Last active ${ lastActive(lastLogin) }`) : '' }
               />
               <div className='courseItem__under'>

                  <Text
                     type={ TextType.normal }
                     // eslint-disable-next-line camelcase
                     inner={ created_at && `User since ${ moment(pivot.created_at).format('MM/DD/YYYY') }` }
                     style={ { fontSize: '12px' } }
                     color='#c2cedb'
                  />
               </div>
            </div>
         </div>
         <div className='courseItem__right'>
            <div className='courseItem__item'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner={ courseStatus(pivot.status) }
                  color='#7cb740'
                  style={ { backgroundColor: 'rgba(124, 183, 64, 0.1)', padding: '3px' } }
               />
               <div className='courseItem__under'>
                  <Text
                     type={ TextType.normal }
                     inner={ `${ pivot.web_session } Sign in Total` }
                     style={ { fontSize: '12px' } }
                     color='#c2cedb'
                  />
               </div>
            </div>
            <div className='courseItem__actions'>
               <div className='m-r-exs' role='presentation' onClick={ () => handlePauseCurrentMemberCourse(course.id) } title={ courseStatus(pivot.status) === 'Active' ? 'Pause' : 'Active' }>
                  <Icon name='Pause' color={ courseStatus(pivot.status) === 'Active' ? '#ff613b' : 'rgb(194, 206, 219)' } />
               </div>

               <div role='presentation' onClick={ () => handleDeleteCurrentMemberCourse(course.id) } title='delete'>
                  <Icon name='Close' />
               </div>
            </div>
         </div>
      </div>
   );
};

CourseItemV1.propTypes = {
   course: PropTypes.object,
   lastLogin: PropTypes.string,
   handlePauseCurrentMemberCourse: PropTypes.func,
   handleDeleteCurrentMemberCourse: PropTypes.func,

};
CourseItemV1.defaultProps = {
   course: {},
};

export default CourseItemV1;
