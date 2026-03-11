/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Pagination from 'components/elements/Pagination';
import SortButton from 'components/elements/buttons/SortButton';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import Switch from 'components/elements/switchNew';
import IconNew from 'components/elements/iconsSize';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import EmptyLangingPage from './components/Empty';
import LandingPageItem from './components/LandingPageItem';

const LandingPages = ({
   editLanding, landings = [], duplicateLanding, deleteLanding, detailsLanding, updateLandingDetails,
   onPageChange, pagination, hanldeNewPages, isEmpty, isMultiSelect,
   checkedIds, setCheckedIds, selectedSorting, onFilter, setIsMultiSelect, multipleDuplicateLandings,
   multipleDeleteLandings,
   isLoading,
}) => {
   const sortingOptions = {
      publish: 'Publish First',
      unpublish: 'Unpublish First',
      'a-z': 'Name A to Z',
      'z-a': 'Name Z to A',
   };
   const handleChackAllIds = () => {
      if (checkedIds.length === landings.length) {
         setCheckedIds([]);
         return;
      }
      setCheckedIds(landings.map((e) => e.url));
   };

   const handleCheckItem = (url) => {
      if (checkedIds.includes(url)) {
         setCheckedIds(checkedIds.filter((e) => e !== url));
         return;
      }
      setCheckedIds([...checkedIds, url]);
   };


   return (
      <div className='landing-pages-wrapper'>
         {isLoading && <LoaderSpinner />}
         {(isEmpty && !isLoading) ? (
            <EmptyLangingPage
               onCreate={ hanldeNewPages }
            />
         ) : (
            <div className='landing-pages-wrapper-bottom'>
               <div className='landing-pages-wrapper-bottom-filter'>
                  <div
                     className='landing-pages-wrapper-bottom-filter-left'
                  >
                     <div
                        className='landing-pages-multiselect-checkbox-wrapper'
                     >
                        {
                           isMultiSelect && (
                              <CheckBox
                                 iconType='asd'
                                 checked={ checkedIds.length === landings.length }
                                 onChange={ handleChackAllIds }
                              />
                           )
                        }
                        {
                           isMultiSelect ? (
                              <Text
                                 inner={ `${ checkedIds.length }/${ landings.length } of ${ pagination.total } Landings` }
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                           ) : (
                              <Text
                                 inner={ `${ landings.length } Landings` }
                                 type={ TextType.regularDefault }
                                 size={ TextSize.small }
                              />
                           )
                        }
                     </div>
                     <Switch
                        value={ isMultiSelect }
                        onChange={ setIsMultiSelect }
                        positionText='right'
                        label='Multiselect'
                        size='medium'
                     />
                     {isMultiSelect && checkedIds.length > 0 && (
                        <div
                           className='landing-pages-multiselect-actions'
                        >
                           <Text
                              inner='Actions: '
                              type={ TextType.regularDefault }
                              size={ TextSize.small }
                           />
                           <div
                              role='presentation'
                              className='landing-pages-multiselect-actions-duplicate'
                              onClick={ multipleDuplicateLandings }
                           >
                              <IconNew name='DuplicateMediaM' />
                           </div>
                           <div
                              role='presentation'
                              className='landing-pages-multiselect-actions-delete'
                              onClick={ multipleDeleteLandings }
                           >
                              <IconNew name='CertificatesDeleteS' />
                           </div>
                        </div>
                     )}
                  </div>
                  <SortButton
                     value={ selectedSorting }
                     onFilter={ (value) => onFilter(value) }
                     options={ sortingOptions }
                  />
               </div>
               <div className='landing-pages-wrapper-items'>
                  {!isLoading && landings.map((e, index) => {
                     return (
                        <LandingPageItem
                           landing={ e }
                           onEdit={ () => editLanding(e.id, e.name) }
                           isMultiSelect={ isMultiSelect }
                           onDelete={ () => deleteLanding(e.url) }
                           onCheck={ () => handleCheckItem(e.url) }
                           onOpenSettings={ () => detailsLanding(e.url) }
                           isChecked={ checkedIds.includes(e.url) }
                           onDuplicate={ () => duplicateLanding(e.url) }
                           updateLanding={ () => updateLandingDetails(e.url, e.is_published) }
                           key={ index }
                        />
                     );
                  })}
               </div>
            </div>
         )}
         {!isEmpty && pagination && pagination.total > 23 && (
            <div className='flex justify-center m-t-exl m-b-exl p-t-exs'>
               <Pagination
                  totalRecords={ pagination && pagination.total }
                  pageLimit={ 23 }
                  pageNeighbours={ 1 }
                  currentPageProp={ pagination && pagination.current_page }
                  onPageChanged={ (pageInfo) => onPageChange(pageInfo) }
                  pagination={ pagination }
               />
            </div>
         )}
      </div>
   );
};

LandingPages.propTypes = {
   editLanding: PropTypes.func,
   landings: PropTypes.array,
   duplicateLanding: PropTypes.func,
   deleteLanding: PropTypes.func,
   detailsLanding: PropTypes.func,
   updateLandingDetails: PropTypes.func,
   hanldeNewPages: PropTypes.func,
   onPageChange: PropTypes.func,
   pagination: PropTypes.object,
   isEmpty: PropTypes.bool,
   onFilter: PropTypes.func,
   checkedIds: PropTypes.array,
   selectedSorting: PropTypes.string,
   setCheckedIds: PropTypes.func,
   isMultiSelect: PropTypes.bool,
   setIsMultiSelect: PropTypes.func,
   multipleDuplicateLandings: PropTypes.func,
   multipleDeleteLandings: PropTypes.func,
   isLoading: PropTypes.bool,
};

export default LandingPages;
