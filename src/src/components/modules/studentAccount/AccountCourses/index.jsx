import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import CoursesTable from 'components/elements/studentAccount/CoursesTable';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import { activeSchoolRoomColor } from 'utils/pageBuilder/schoolRoomColor';
import { useTranslate } from 'react-polyglot';

const AccountCourses = ({ courses, handleCourseReset, siteInfo }) => {
   const t = useTranslate();
   return (
      <ItemWrapper>
         <div className='accountCourses__module'>
            <div className='title'>
               <div>
                  <Text
                     type={ TextType.bold }
                     size={ TextSize.large }
                     inner={ t('my_courses') }
                     color='#333333'
                  />
               </div>
               <div className='total'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.extraSmall }
                     inner={ `${ Object.values(courses).length } ${ t('total') }` }
                     color={ activeSchoolRoomColor(siteInfo) }
                  />
               </div>

            </div>
            <CoursesTable courses={ courses } handleCourseReset={ handleCourseReset } />
         </div>
      </ItemWrapper>
   );
};

AccountCourses.propTypes = {
   courses: PropTypes.object,
   handleCourseReset: PropTypes.func,
   siteInfo: PropTypes.object,
};

export default AccountCourses;
