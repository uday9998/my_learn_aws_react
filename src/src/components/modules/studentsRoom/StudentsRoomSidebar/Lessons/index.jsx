import React from 'react';
import './index.scss';
import DropdownCard from 'components/modules/studentsRoom/DropdownCard';
import ProgressLine from 'components/elements/progressBar/ProgressLine';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import defaultAuthor from 'assets/images/user.jpg';
import { useHistory } from 'react-router-dom';
import BaseButton, { THEMES as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButtonNew';
import { color } from 'd3';

const Lessons = ({
   changeLesson, activeLesson, sections, lessons, courseComplatePercent, textColor,
   primaryTheme, course, darkMode, hasCertificate, joinedStatus, primaryButton, setOpenNavBar, isMobile,
}) => {
   const history = useHistory();
   
   const goToCertificates = () => {
      history.push('/my-account#certificates');
   };

   const truncateText = (text, maxLength = 30) => {
      if (!text) return '';
      return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
   };

   return (
      <>
         <div className={`students-sidebar__header-bottom studentsSidebar ${hasCertificate ? '' : 'customMarginBottom'}`}>
            <div className='studentsSidebar__top'>
               <div className='studentsSidebar__img'>
                  <img src={ course.thumbnail_image || defaultAuthor } alt='class' />
               </div>
               <div className='studentsSidebar__abs'>
                  <div className='studentsSidebar__abs__content'>
                     <div className='separate-coursename'>
                        <Text
                           inner={ truncateText(course.name) }
                           type={ TextType.medium150 }
                           size={ TextSize.medium }
                        />
                     </div>
                     <div className='studentsSidebar__abs__content__percent'>
                        <Text
                           type={ TextType.regularDefault }
                           size={ TextSize.small }
                           inner={ `${ courseComplatePercent }%` }
                           style={{color: '#24554e'}}
                        />
                        <ProgressLine
                           progress={ courseComplatePercent }
                           color={ 'var(--buttonBgcolor)' || 'rgba(123, 83, 233, 1)' }
                        />
                     </div>
                  </div>
               </div>
            </div>

            {hasCertificate && (
               <div className='certificate_btn'>
                  <BaseButton
                     theme={ buttonTheme.darkGreen }
                     size={ buttonSizes.full }
                     text={ (
                        <div className='certificate_btn_content'>
                           <span>Get Your Certificate</span>
                        </div>
                     ) }
                     onClick={ goToCertificates }
                     style={{background: '#24554e', color: '#fff'}}
                  />
               </div>
            )}
         </div>

         {sections.map((section, i) => {
            const filteredLesson = lessons.filter(lesson => lesson.section_id === section.id);
            if (filteredLesson.length) {
               return (
                  <DropdownCard
                     textColor={ textColor }
                     key={ section.id }
                     sections={ sections[i] }
                     lessons={ filteredLesson }
                     changeLesson={ changeLesson }
                     setOpenNavBar={ setOpenNavBar }
                     isMobile={ isMobile }
                     activeLesson={ activeLesson }
                     sectionIndex={ i }
                     down={ true }
                     darkMode={ darkMode }
                     style={ darkMode ? { backgroundColor: 'transparent' } : {} }
                     primaryTheme={ primaryTheme }
                     primaryButton={ primaryButton }
                     joinedStatus={ joinedStatus }
                  />
               );
            }
            return null;
         })}
      </>
   );
};

Lessons.propTypes = {
   changeLesson: PropTypes.func,
   activeLesson: PropTypes.number,
   sections: PropTypes.array,
   lessons: PropTypes.array,
   courseComplatePercent: PropTypes.number,
   textColor: PropTypes.string,
   primaryTheme: PropTypes.string,
   course: PropTypes.object,
   darkMode: PropTypes.bool,
   hasCertificate: PropTypes.bool,
   joinedStatus: PropTypes.number,
   primaryButton: PropTypes.object,
   setOpenNavBar: PropTypes.func,
   isMobile: PropTypes.bool,
};

Lessons.defaultProps = {
   sections: {},
   lessons: [],
   changeLesson: () => {},
   activeLesson: 1,
   courseComplatePercent: 0,
};

export default Lessons;