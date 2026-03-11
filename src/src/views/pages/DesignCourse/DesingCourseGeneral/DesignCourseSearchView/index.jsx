import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import SearchText from 'components/elements/searchText';
import { uniqueId } from 'lodash';

const DesignCourseSearchView = ({ data, search, setSelectedSection }) => {
   const [lessonsArray, setLessonsArray] = useState([]);
   useEffect(() => {
      const toLessonsArray = data.reduce((prev, next) => {
         return [...prev, ...next.lessons];
      }, []);
      setLessonsArray(toLessonsArray);
   }, [data]);
   return (
      <div className='design__course__search__view'>
         <div className='design__course__search__view__left'>
            <Text
               inner='Found in Sections'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
            <div className='design__course__search__view__left__data'>
               {data.map((section) => {
                  return (
                     <div className='search__item' key={ uniqueId() }>
                        <div
                           style={ { cursor: 'pointer' } }
                           className='search__item__left'
                           role='presentation'
                           onClick={ () => setSelectedSection(section) }
                        >
                           <IconNew name='ClosedFolderProgramM' />
                           <SearchText
                              textProps={ {
                                 inner: section.name,
                                 type: types.regularDefault,
                                 size: sizes.small,
                              } }
                              searchText={ search }
                              activeColor='rgba(0,176,255,0.2)'
                           />
                        </div>
                        <div className='search__item__right'>
                           <div className='search__item__right__comments'>
                              <IconNew name='CommentsProgramS' />
                              <Text
                                 inner={ section.comments_count }
                                 type={ types.medium150 }
                                 size={ sizes.xsmall }
                              />
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
         <div className='design__course__search__view__left'>
            <Text
               inner='Found in Lessons'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
            <div className='design__course__search__view__left__data'>
               {lessonsArray.map((lesson) => {
                  return (
                     <div className='search__item' key={ uniqueId() }>
                        <div className='search__item__left'>
                           <IconNew name='FileSectionProgramM' />
                           <SearchText
                              textProps={ {
                                 inner: lesson.name,
                                 type: types.regularDefault,
                                 size: sizes.small,
                              } }
                              searchText={ search }
                              activeColor='rgba(0,176,255,0.2)'
                           />
                        </div>
                        <div className='search__item__right' />
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

DesignCourseSearchView.propTypes = {
   data: PropTypes.array,
   search: PropTypes.string,
   setSelectedSection: PropTypes.func,
};

export default DesignCourseSearchView;
