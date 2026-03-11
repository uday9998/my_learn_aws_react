import React from 'react';
import Text, { TYPES as types, SIZES as sizes, TextWithTooltip } from 'components/elements/TextNew';
import IconButton from 'components/elements/buttons/IconButton';
import './index.scss';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   createCourseCommentMyAccount, deleteMultiCourseComment, myAccountComments, toggleLikeCourseCommentMyAccount,
} from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import IconNew from 'components/elements/iconsSize';
import CommentsView from './Components/CommentsView';

const getFilteredCommentsData = (data) => {
   const newCourses = data.page_data.filter((course) => {
      const count = course.lessons.reduce((prev, next) => {
         return prev + next.lesson_comments.length;
      }, 0);
      return count > 0;
   });
   return newCourses;
};

const MyAccountComments = () => {
   const [selectedCourse, setSelectedCourse] = React.useState({});
   const { data, setData, loading } = useApiQuery(myAccountComments);
   const [update] = useSubmitForm(myAccountComments);
   const [query] = useSubmitForm(deleteMultiCourseComment);
   const [like] = useSubmitForm(toggleLikeCourseCommentMyAccount);
   const [comment] = useSubmitForm(createCourseCommentMyAccount);
   const [isOpenLeft, setIsOpenLeft] = React.useState(true);

   const handleDeleteComment = (ids, callBack) => {
      query([selectedCourse.url, ids], () => {
         callBack();
         update(null, (newData) => {
            setData(newData);
            setSelectedCourse(newData.page_data.find((course) => course.id === selectedCourse.id));
         });
      });
   };

   const handleLikeComment = (id) => {
      like([selectedCourse.url, id], () => {
         update(null, (newData) => {
            setData(newData);
            setSelectedCourse(newData.page_data.find((course) => course.id === selectedCourse.id));
         });
      });
   };

   const handleReplyComment = (lesson, text, parentId) => {
      comment({
         course_id: selectedCourse.id,
         text,
         lesson_id: lesson.id,
         parent_id: parentId,
         section_id: lesson.section_id,
      }, () => {
         update(null, (newData) => {
            setData(newData);
            setSelectedCourse(newData.page_data.find((course) => course.id === selectedCourse.id));
         });
      });
   };

   const handleFilter = (value) => {
      update(value, (newData) => {
         setData(newData);
         setSelectedCourse(newData.page_data.find((course) => course.id === selectedCourse.id));
      });
   };

   return (
      <div className='my__account__comments'>
         <ComponentProgress loading={ loading }>
            <div className={ `my__account__comments__left ${ isOpenLeft ? 'opened' : 'closed' }` }>
               <Text
                  inner='Courses'
                  type={ types.medium160 }
                  size={ sizes.xlarge }
               />
               <div className='my__account__comments__left__courses'>
                  {
                     data && data.page_data && getFilteredCommentsData(data).length > 0 ? (
                        data && data.page_data && getFilteredCommentsData(data).map((e) => {
                           return (
                              <div
                                 key={ e.id }
                                 className='my__account__comments__left__course'
                                 style={ selectedCourse.id === e.id ? { background: '#36796F' } : { background: 'inherit' } }
                                 role='presentation'
                                 onClick={ () => {
                                    setSelectedCourse(e);
                                    setIsOpenLeft(false);
                                 } }
                              >
                                 <Text
                                    inner={ e.name }
                                    type={ types.regularDefault }
                                    style={ selectedCourse.id === e.id ? { color: '#FFFFFF' } : { color: '#131F1E' } }
                                    size={ sizes.small }
                                 />
                                 <IconButton
                                    name='MyAccountArrowS'
                                    color={ selectedCourse.id === e.id ? '#FFFFFF' : '#A1A5A5' }
                                 />
                              </div>
                           );
                        })
                     ) : (
                        <Text
                           inner='No items to select.'
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: '#727978', textAlign: 'center', margin: 'auto 0px' } }
                        />
                     )
                  }
               </div>
               <div
                  className='my__account__comments__left__spliter'
                  role='presentation'
                  onClick={ () => setIsOpenLeft(!isOpenLeft) }
               >
                  <IconNew name='ChevronLeftL' style={ !isOpenLeft ? { transform: 'rotate(180deg)' } : {} } />
               </div>
            </div>
            <div className='my__account__comments__right'>
               {selectedCourse.id ? (
                  <>
                     <TextWithTooltip
                        type={ types.medium160 }
                        size={ sizes.xlarge }
                        tooltip='asd'
                        isIconRigth={ true }
                        inner='Comments'
                     />
                     <CommentsView
                        like={ handleLikeComment }
                        reply={ handleReplyComment }
                        filterComments={ handleFilter }
                        course={ selectedCourse }
                        onDelete={ handleDeleteComment }
                     />
                  </>
               ) : (
                  <Text
                     inner='Select an item to see comments.'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978', textAlign: 'center', margin: 'auto 0px' } }
                  />
               )}
            </div>
         </ComponentProgress>
      </div>
   );
};

MyAccountComments.propTypes = {

};

export default MyAccountComments;
