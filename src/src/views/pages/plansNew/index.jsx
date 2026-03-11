import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
// import Pagination from 'components/elements/Pagination';
import Switch from 'components/elements/switchNew';
import './index.scss';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IconButton, { THEMES as iconThemes } from 'components/elements/buttons/IconButton';
import SortButton from 'components/elements/buttons/SortButton';
import LoaderMini from 'components/elements/loaderMini';
import PlansNewTable from './components/table';

const options = {
   recently: 'Recently Updated',
   newest: 'Newest',
   oldest: 'Oldest First',
   publish: 'Publish First',
   unpublish: 'Unpublished First',
};
const PlansView = ({
   data, isMultiSelect, setIsMutliSelect, sortBy,
   checkedPlanIds, handleCheck, deleteOnePlan, duplicateOnePlan, duplicatePlans,
   setSortBy, currencyData, goToEdit, isMobile, isFetchingNextPage, deletePlans,
}) => {
   return (
      <div className='plans__view'>
         <div className='plans__view__top'>
            <div className='plans__view__top__left'>
               <div className='plans__view__top__left__flex'>
                  {isMultiSelect && (
                     <CheckBox
                        checked={ checkedPlanIds.length === data.length }
                        onChange={ () => handleCheck(null, true) }
                     />
                  )}
                  <Text
                     inner={ isMultiSelect ? `${ checkedPlanIds.length }/${ data.length } Bundles` : `${ data.length } Bundles` }
                     type={ types.regularDefault }
                     size={ sizes.small }
                  />
               </div>
               {data.length > 1 && (
                  <>
                     <div className='plans__view__top__left__line' />
                     <Switch
                        positionText='right'
                        label='Multiselect'
                        value={ isMultiSelect }
                        size='medium'
                        onChange={ setIsMutliSelect }
                     />
                  </>
               )}
               {checkedPlanIds.length > 0 && isMultiSelect && (
                  <>
                     <div className='plans__view__top__left__line' />
                     <div className='plans__view__top__left__flex'>
                        <Text
                           inner='Actions: '
                           type={ types.regularDefault }
                           size={ sizes.small }
                        />
                        <div className='plans__view__top__left__flex__actions'>
                           <IconButton
                              name='DuplicateMediaM'
                              onClick={ () => duplicatePlans() }
                              theme={ iconThemes.light }
                              wBorder={ true }
                           />
                           <IconButton
                              name='CertificatesDeleteS'
                              wBorder={ true }
                              onClick={ () => deletePlans() }
                              theme={ iconThemes.delete }
                           />
                        </div>
                     </div>
                  </>
               )}
            </div>
            <SortButton
               value={ sortBy }
               onFilter={ (value) => setSortBy(value) }
               options={ options }
            />
         </div>
         <PlansNewTable
            data={ data }
            isMultiSelect={ isMultiSelect }
            currencyData={ currencyData }
            duplicateOnePlan={ (...params) => duplicateOnePlan(...params) }
            checkedIds={ checkedPlanIds }
            goToEdit={ goToEdit }
            onCheck={ handleCheck }
            onSingleRemove={ (...params) => deleteOnePlan(...params) }
            isMobile={ isMobile }
         />
         {
            isFetchingNextPage && (
               <div className='plans__view__next__page__loader'>
                  <LoaderMini color='#131f1e' />
               </div>
            )
         }
      </div>
   );
};

PlansView.propTypes = {
   data: PropTypes.array,
   handleCheck: PropTypes.func,
   duplicatePlans: PropTypes.func,
   currencyData: PropTypes.array,
   setIsMutliSelect: PropTypes.func,
   deleteOnePlan: PropTypes.func,
   setSortBy: PropTypes.func,
   isMultiSelect: PropTypes.bool,
   sortBy: PropTypes.string,
   duplicateOnePlan: PropTypes.func,
   checkedPlanIds: PropTypes.array,
   goToEdit: PropTypes.func,
   isMobile: PropTypes.bool,
   isFetchingNextPage: PropTypes.bool,
   deletePlans: PropTypes.func,
};

export default PlansView;
