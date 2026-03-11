// Updated LessonView Header Component
import React from 'react';
import Text, { TextWithIcon, SIZES as textSize, TYPES as textType } from 'components/elements/TextNew';
import TextWithSeeMore from 'components/modules/TextWithSeeMore';
import './LessonHeader.scss';

const LessonHeader = ({
  lesson,
  course,
  isBookmarked,
  addBookmark,
  primaryTheme,
}) => {
  const LessonAuthor = lesson.author || (course && course.authors && course.authors[0]);
  
  return (
    <div className="lesson-header">
      <div className="lesson-header__container">
        <div className="lesson-header__content">
          <div className="lesson-header__main">
            <h1 className="lesson-header__title notranslate" style={{ fontFamily: primaryTheme }}>
              {lesson.name}
            </h1>
            <div className='mobile-instructor'>

         
            
            {LessonAuthor && (
              <div className="lesson-header__author">
                <div className="lesson-header__author-avatar">
                  <img src={LessonAuthor.picture_src} alt={`${LessonAuthor.name}'s avatar`} />
                </div>
                <div className="lesson-header__author-info">
                  <div className="lesson-header__author-label">Instructor</div>
                  <div className="notranslate">
                    <Text
                      inner={LessonAuthor.name}
                      type={textType.medium}
                      size={textSize.xsmall}
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div 
              className={`lesson-header__bookmark ${isBookmarked ? 'lesson-header__bookmark--active' : ''}`}
              onClick={() => addBookmark(lesson.id, lesson, isBookmarked)}
            >
              <TextWithIcon
                type={textType.regularDefault}
                size={textSize.xsmall}
                iconName={!isBookmarked ? 'BookMarkM' : 'BookMarkFilledM'}
                inner="Bookmark"
                generalStyles={{ cursor: 'pointer' }}
              />
            </div>
            </div>
          </div>
          
          {lesson && lesson.subtitle && (
            <div className="lesson-header__subtitle">
              <TextWithSeeMore text={lesson.subtitle} maxLength={310} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;