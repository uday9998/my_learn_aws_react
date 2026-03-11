import React from 'react';
import { useApiQuery } from 'utils/hooks/useQuery';
import ComponentProgress from 'components/modules/ComponentProgress';
import { favoriteOffer, getMyAccountSavedCourses } from 'api';
import SortButton from 'components/elements/buttons/SortButton';
import Input from 'components/elements/inputNew';
import './index.scss';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import SavedOfferTemplate from './Components/SaveCourseTemplate';

const MyAccountSavedCourses = () => {
   const { data, setData, loading } = useApiQuery(getMyAccountSavedCourses, ['']);
   const [favoriteOfferQuery] = useSubmitForm(favoriteOffer);
   const [handleFilter] = useSubmitForm(getMyAccountSavedCourses);
   const [filterData, setFilterData] = React.useState({
      search: '',
      sort: 'recently',
   });

   const handleInputChange = (name, value) => {
      setFilterData({
         ...filterData,
         [name]: value,
      });
   };

   React.useEffect(() => {
      handleFilter(`search=${ filterData.search }&order_by=${ filterData.sort }`, (newData) => setData(newData));
   }, [filterData]);

   const sortingOptions = {
      'recently': 'Recently Updated',
      'newest': 'Newest',
      'oldest': 'Oldest',
      'a_z': 'Name A-Z',
   };

   const handleFavorite = (id) => {
      favoriteOfferQuery(id);
   };

   const exploreOffer = (id) => {
      window.open(`offers?selectedOffer=${ id }`);
   };

   const handleFavoriteOffer = (id) => {
      handleFavorite(id);
   };

   return (
      <ComponentProgress loading={ loading }>
         <div className='my__account__saved'>
            <div className='my__account__saved__filter'>
               <Input
                  type='search'
                  value={ filterData.search }
                  placeholder='Search'
                  name='search'
                  onChange={ handleInputChange }
               />
               <div className='my__account__saved__filter__buttons'>
                  {/* <SortButton
                     type='second'
                     onFilter={ (value) => handleInputChange('filter', value) }
                     value={ filterData.filter }
                     options={ filterOptions }
                     isFilterHaveOptions={ true }
                  /> */}
                  <SortButton
                     type='first'
                     onFilter={ (value) => handleInputChange('sort', value) }
                     value={ filterData.sort }
                     options={ sortingOptions }
                  />
               </div>
            </div>
            <div className='my__account__saved__data'>
               {data && data.page_data.map((e) => {
                  return (
                     <SavedOfferTemplate
                        key={ e.id }
                        onExplore={ () => exploreOffer(e.offers[0].id) }
                        handleFavorite={ () => handleFavoriteOffer(e.offers[0].id, e.id) }
                        offer={ e.offers[0]
                        }
                     />
                  );
               })}
            </div>
         </div>
      </ComponentProgress>
   );
};

MyAccountSavedCourses.propTypes = {

};

export default MyAccountSavedCourses;
