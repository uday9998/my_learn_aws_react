import React from 'react';
import Input from 'components/elements/inputNew';
import './index.scss';
import SortButton from 'components/elements/buttons/SortButton';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { myAccountCourses } from 'api';
import LoaderMini from 'components/elements/loaderMini';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import { useApiQuery } from 'utils/hooks/useQuery';
import coverImg from 'assets/images/thumbnail.png';
import emptyState from 'assets/images/schoolRoom/empty_state_product.png';
import MyAccountCourseTemplate from './Course';
import { MyAccountContext } from 'containers/pages/member/account';

const MyCourses = () => {
   const { t } = React.useContext(MyAccountContext);
   const { data, setData, loading } = useApiQuery(myAccountCourses);
   const [handleFilter, { loading: filterLoading }] = useSubmitForm(myAccountCourses);
   const [filterData, setFilterData] = React.useState({
      search: '',
      filter: '',
      sort: 'recently_updated',
   });

   const handleInputChange = (name, value) => {
      setFilterData({
         ...filterData,
         [name]: value,
      });
   };

   const sortingOptions = {
      'recently_updated': 'Recently Updated',
      'newest': 'Newest',
      'oldest': 'Oldest',
      'A_Z': 'Name A-Z',
   };
   const filterOptions = {
      'new': 'New',
      'in_progress': 'In Progress',
      'complete': 'Complete',
      'free': 'Free',
      'viewed': 'Viewed',
   };
   const courses = data ? data.page_data.filter((e) => e.type !== '2') : [];

   React.useEffect(() => {
      handleFilter(`search=${ filterData.search }&filter=${ filterData.filter }&order_by=${ filterData.sort }`, (newData) => setData(newData));
   }, [filterData]);
   
   return (
      <div className='my__account__courses'>
         <div className='my__account__courses__filter'>
            <Input
               type='search'
               value={ filterData.search }
               placeholder='Search'
               name='search'
               onChange={ handleInputChange }
            />
            <SortButton
               type='second'
               onFilter={ (value) => handleInputChange('filter', value) }
               value={ filterData.filter }
               options={ filterOptions }
               isFilterHaveOptions={ true }
               iconName='FilterM'
               isNewIcon={ true }
            />
            <SortButton
               type='first'
               onFilter={ (value) => handleInputChange('sort', value) }
               value={ filterData.sort }
               options={ sortingOptions }
            />
         </div>
         {(loading || filterLoading) ? (
            <LoaderMini color='#131f1e' />
         ) : (
            <>
               <div className='my__account__courses__data'>
                  {courses.length === 0 ? (
                     <div className='my__account__courses__data__empty'>
                        <Text
                           inner='No Products Yet'
                           type={ types.mediumLargeGrey }
                           size={ sizes.new_size_28 }
                           style={ { color: '#727978', margin: '0px auto' } }
                        />
                        <img src={ emptyState } alt='No Products Yet' />
                     </div>

   
                  ) : (
                     <>
                        {courses.map((e) => {
                           return (
                              <MyAccountCourseTemplate
                                 type={ e.type === '1' }
                                 title={ e.name }
                                 key={ e.id }
                                 url={ e.url }
                                 image={ e.thumbnail_image || e.picture_src }
                                 description={ e.description }
                                 lessonsCount={ e.lessons_count }
                                 author={
                                    e.authors && e.authors[0]
                                       ? {
                                          picture_src: e.authors[0].picture_src,
                                          title: e.authors[0].name,
                                       }
                                       : {
                                          picture_src: coverImg,
                                          title: 'Author',
                                       } }
                                 progress={ e.progress_percentage }
                              />
                           );
                        })}
                     </>
                  )}

               </div>
            </>
         )}
      </div>
   );
};

MyCourses.propTypes = {

};

export default MyCourses;
