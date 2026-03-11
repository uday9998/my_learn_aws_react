/* eslint-disable react/no-array-index-key */
import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import coverImg from 'assets/images/thumbnail.png';
import { useTranslate } from 'react-polyglot';

const CoursesTable = ({ courses, handleCourseReset }) => {
   const t = useTranslate();
   return (
      <table className='coursesTable'>
         <tbody>
            { Object.values(courses).map((course, i) => {
               return (
                  <tr key={ i } className={ classnames('videosTable__row') }>
                     <td className='videosTable__data'>
                        <span className='flex align-center course_img elipses_account'>
                           <img src={ course.thumbnail_image && course.thumbnail_image !== 'default.png' ? course.thumbnail_image : coverImg } alt='' style={ { marginRight: '12px' } } />
                           <span className='elipses'>
                              <Text
                                 type={ TextType.regular }
                                 size={ TextSize.extraSmall }
                                 inner={ course.name }
                                 color='#333333'
                              />
                           </span>
                        </span>

                     </td>
                     <td className='videosTable__data'>
                        <div className='btnWrapper'>
                           <BaseButton
                              theme={ btnTheme.lightGreen }
                              size={ btnSize.large }
                              text={ t('reset') }
                              onClick={ () => handleCourseReset(course.id) }
                              style={ { borderRadius: '4px' } }
                           />
                        </div>
                     </td>
                  </tr>
               );
            }) }
         </tbody>
      </table>
   );
};

CoursesTable.propTypes = {
   courses: PropTypes.object,
   handleCourseReset: PropTypes.func,
};

CoursesTable.defaultProps = {
   handleCourseReset: () => {},
};

export default CoursesTable;
