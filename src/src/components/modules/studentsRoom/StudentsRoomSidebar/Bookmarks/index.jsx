/* eslint-disable array-callback-return */
import React from 'react';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import Proptypes from 'prop-types';
import bookmarksImg from 'assets/images/schoolRoom/bookmark.png';
import IconNew from 'components/elements/iconsSize';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import './index.scss';

const Bookmarks = ({
   bookmarks, removeBookmark, loadingBookmark, changeLesson,
}) => {
   return (

      <div className='lessonBookmarks'>
         <div className='bookmarkHeader'>
            <div>
               <Text
                  inner={ `Bookmarks (${ bookmarks.length })` }
                  type={ TextType.medium }
                  size={ TextSize.xxlarge }
               />
            </div>
         </div>
         {!!loadingBookmark && <LoaderSpinner width={ 150 } heigth={ 150 } background='transparent' />}
         {bookmarks.length > 0 && bookmarks.map(bookmark => {
            return (
               <div key={ bookmark.id } className='bookmarkSinge'>
                  <div role='presentation' onClick={ () => changeLesson(bookmark.id, bookmark.lesson_format, bookmark.is_driplesson, bookmark) } style={ { cursor: 'pointer' } }>
                     <Text
                        inner={ bookmark.name }
                        type={ TextType.medium150 }
                        size={ TextSize.medium }
                     />
                  </div>
                  <div className='bookmarkSinge__delete' role='presentation' onClick={ () => removeBookmark(bookmark.id) }>
                     <IconNew name='TrashSettingsM' />
                  </div>
               </div>
            );
         }

         ) }
         {!bookmarks.length && (
            <div className='lessonBookmarks__empty'>
               <div>
                  <img src={ bookmarksImg } alt='note' />
               </div>
               <div>
                  <Text
                     inner='Currently, there are no bookmarks.'
                     type={ TextType.regularDefault }
                     size={ TextSize.small }
                     style={ { color: 'var(--textColor70)' } }
                  />
               </div>
               <div>
                  <Text
                     inner='To add a bookmark, click on the bookmark icon'
                     type={ TextType.mediumSmall }
                     size={ TextSize.xxlarge }
                  />
               </div>
            </div>
         )}
      </div>

   );
};

Bookmarks.propTypes = {
   bookmarks: Proptypes.array,
   removeBookmark: Proptypes.func,
   loadingBookmark: Proptypes.bool,
   changeLesson: Proptypes.func,
};

Bookmarks.defaultProps = {
   loadingBookmark: false,
};

export default Bookmarks;
