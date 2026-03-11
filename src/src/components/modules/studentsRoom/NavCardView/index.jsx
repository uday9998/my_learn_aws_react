import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import AuthorInfo from 'components/elements/studentsRoom/AuthorInfo';
import LessonsMedals from 'components/modules/studentsRoom/LessonsMedals';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
// import defaultAuthor from 'assets/images/user.jpg';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import NotFoundImg from 'assets/images/mobile/main-hub/artwork.png';
import { useTranslate } from 'react-polyglot';

function forceDownload(url, fileName) {
   const xhr = new XMLHttpRequest();
   xhr.open('GET', url, true);
   xhr.responseType = 'blob';
   xhr.onload = function () {
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(this.response);
      const tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
   };
   xhr.send();
}
const NavCardView = ({
   active, primaryTheme, defaultColor, textColor, darkMode, lesson,
}) => {
   const t = useTranslate();
   let view;
   switch (active) {
      // case 2: view = (
      //    <AuthorInfo
      //       avatar={ author.img ? author.img : defaultAuthor }
      //       info={ course.description }
      //       name={ course.name }
      //       primaryTheme={ primaryTheme }
      //       defaultColor={ defaultColor }
      //       boldTxt
      //    />
      // ); break;
      case 3: view = (lesson.lesson_badge && (
         <LessonsMedals
            badgeColorless={ lesson.badge_colorless }
            lessonBadge={ lesson.lesson_badge }
            primaryTheme={ primaryTheme }
            darkMode={ darkMode }
         />
      )

      ); break;
      case 4: view = (
         lesson.resources && lesson.resources.length !== 0 && (
            lesson.resources.map(resource => {
               return (
                  <div className='resourceBlock' key={ resource.id }>
                     <div>
                        <div>
                           <Text
                              type={ TextType.normal }
                              inner={ resource.title }
                              size={ TextSize.small }
                           //  style={ { fontFamily: primaryTheme, color: defaultColor } }
                           />
                        </div>
                        {/* <div>
                           <Text
                              type={ TextType.normal }
                              inner={ resource.size === '0.00' ? '0.01 MB' : `${ resource.size } MB` }
                              size={ TextSize.extraSmall }
                              style={ { fontFamily: primaryTheme, color: defaultColor } }
                           />
                        </div> */}

                     </div>

                     <div className='resource__download'>
                        <BaseButton
                           size={ btnSize.medium }
                           text={ t('download') }
                           onClick={ () => { forceDownload(resource.src, resource.title); } }
                           theme={ btnTheme.lightBlue }
                           style={ { backgroundColor: textColor } }
                           //  style={ { fontFamily: primaryTheme, backgroundColor: textColor, color: '#fff' } }
                        />
                     </div>

                  </div>
               );
            })
         )

      ); break;
      default: break;
   }
   return (
      <div className='NavCardView'>
         { lesson.resources && lesson.resources.length !== 0 && (
            <Text
               type={ TextType.normal }
               inner='Resources'
               size={ TextSize.xlarge }
            />
         )}
         { view }
      </div>
   );
};

const EmptyState = ({ active, primaryTheme }) => {
   return (
      <div className='NotFound'>
         <Text
            inner={ `No ${ active === 3 ? 'Badge' : 'Resources' } Found` }
            color='#8a94a2'
            type={ TextType.bold }
            size={ TextSize.size_28 }
            style={ { fontFamily: primaryTheme } }
         />
         <img src={ NotFoundImg } alt='not found' className='notFoundImg' />
      </div>
   );
};

NavCardView.propTypes = {
   active: PropTypes.number,
   lesson: PropTypes.object,
   primaryTheme: PropTypes.string,
   defaultColor: PropTypes.string,
   textColor: PropTypes.string,
   darkMode: PropTypes.string,
};
EmptyState.propTypes = {
   active: PropTypes.number,
   primaryTheme: PropTypes.string,
};

NavCardView.defaultProps = {
   active: 1,
   lesson: {},
};

export default NavCardView;
