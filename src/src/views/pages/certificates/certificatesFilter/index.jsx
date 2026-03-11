import React from 'react';
import Input from 'components/elements/inputNew';
import PropTypes from 'prop-types';
import './index.scss';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Switch from 'components/elements/switchNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import SortButton from 'components/elements/buttons/SortButton';
import IconNew from 'components/elements/iconsSize';
import IconButton, { THEMES as iconButtonThemes } from 'components/elements/buttons/IconButton';

const options = {
   recently: 'Recently Updated',
   newest: 'Newest',
   oldest: 'Oldest',
   published: 'Published',
   draft: 'Draft',
};

const CertificatesFilter = ({
   searchValue, setSearchValue, searchOnEnter, onClearSearch, isMultiSelected, setIsMultiSelected, certificates,
   onCheck, checkedItemsLength, onFilter, certificateSortingValue, onRemoveSelected, duplicateCertificates, isMobile,
}) => {
   return (
      <div className='certificates__filter'>
         <Input
            value={ searchValue }
            onKeyPress={ searchOnEnter }
            placeholder='What are you looking for?'
            onClearSearchValue={ () => onClearSearch() }
            type='search'
            onChange={ (name, value) => setSearchValue(value) }
         />
         <div
            className='certificates__filter__bottom__wrapper'
         >
            <div className='certificates__filter__bottom'>
               <div className='certificates__filter__bottom__left'>
                  <div className='certificates__filter__count'>
                     {isMultiSelected ? (
                        <CheckBox
                           iconType='asd'
                           checked={ checkedItemsLength === certificates.length }
                           onChange={ onCheck }
                        />
                     ) : (
                        <div />
                     )}
                     <Text
                        inner={ `${ isMultiSelected ? `${ checkedItemsLength }/` : '' }${ certificates.length } Certificates` }
                        type={ TextType.regularDefault }
                        size={ TextSize.small }
                     />
                  </div>
                  <Switch
                     value={ isMultiSelected }
                     onChange={ setIsMultiSelected }
                     label='Multiselect'
                     size='medium'
                  />
                  {isMultiSelected && checkedItemsLength > 0 && !isMobile && (
                     <div className='certificates__filter__bottom__actions'>
                        <Text
                           inner='Actions: '
                           type={ TextType.regularDefault }
                           size={ TextSize.small }
                        />
                        <IconButton
                           theme={ iconButtonThemes.primary }
                           onClick={ () => duplicateCertificates() }
                           name='CertificateDuplicateS'
                        />
                        <div className='certificates__filter__bottom__actions__delete' role='presentation' onClick={ () => onRemoveSelected() }>
                           <IconNew name='CertificatesDeleteS' />
                        </div>
                     </div>
                  )}
               </div>
               {!isMultiSelected && (
                  <SortButton onFilter={ onFilter } value={ certificateSortingValue } options={ options } />
               )}
            </div>
            {
               isMobile && isMultiSelected && checkedItemsLength > 0 && (
                  <div className='certificates__filter__bottom__actions'>
                     <Text
                        inner='Actions: '
                        type={ TextType.regularDefault }
                        size={ TextSize.small }
                     />
                     <IconButton
                        theme={ iconButtonThemes.primary }
                        onClick={ () => duplicateCertificates() }
                        name='CertificateDuplicateS'
                     />
                     <div className='certificates__filter__bottom__actions__delete' role='presentation' onClick={ () => onRemoveSelected() }>
                        <IconNew name='CertificatesDeleteS' />
                     </div>
                  </div>
               )
            }
         </div>
      </div>
   );
};

CertificatesFilter.propTypes = {
   searchOnEnter: PropTypes.func,
   onRemoveSelected: PropTypes.func,
   searchValue: PropTypes.string,
   setSearchValue: PropTypes.func,
   isMultiSelected: PropTypes.bool,
   setIsMultiSelected: PropTypes.func,
   onClearSearch: PropTypes.func,
   onFilter: PropTypes.func,
   onCheck: PropTypes.func,
   certificates: PropTypes.array,
   certificateSortingValue: PropTypes.string,
   checkedItemsLength: PropTypes.number,
   duplicateCertificates: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default CertificatesFilter;
