import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/elements/inputNew';
import './index.scss';
import CheckBox from 'components/elements/form/CheckBoxNew';
import Switch from 'components/elements/switchNew';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import SortButton from 'components/elements/buttons/SortButton';
import IconNew from 'components/elements/iconsSize';

const options = {
   recently: 'Recently Updated',
   newest: 'Newest',
   oldest: 'Oldest',
   published: 'Published',
   draft: 'Draft',
};

const BlogFilter = ({
   blog, isMultiSelected,
   searchValue, onClearSearch, setSearchValue, checkedItemsLength, onCheck, setIsMultiSelected,
   onFilter, blogSortingValue, onRemoveSelected,
}) => {
   return (
      <div className='blog__filter'>
         <Input
            value={ searchValue }
            // onKeyPress={ searchOnEnter }
            onClearSearchValue={ () => onClearSearch() }
            type='search'
            placeholder='What are you looking for?'
            onChange={ (name, value) => setSearchValue(value) }
         />
         <div className='blog__filter__bottom'>
            <div className='blog__filter__bottom__left'>
               <div className='blog__filter__count'>
                  {isMultiSelected ? (
                     <CheckBox
                        iconType='asd'
                        checked={ checkedItemsLength === blog.length }
                        onChange={ onCheck }
                     />
                  ) : (
                     <div />
                  )}
                  <Text
                     inner={ `${ isMultiSelected ? `${ checkedItemsLength }/` : '' }${ blog.length } Articles` }
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
               {isMultiSelected && (
                  <div className='blog__filter__bottom__actions'>
                     <Text
                        inner='Actions: '
                        type={ TextType.regularDefault }
                        size={ TextSize.small }
                     />
                     <div className='blog__filter__bottom__actions__delete' role='presentation' onClick={ () => (checkedItemsLength > 0 ? onRemoveSelected() : { }) }>
                        <IconNew name='CertificatesDeleteS' />
                     </div>
                  </div>
               )}
            </div>
            {!isMultiSelected && (
               <SortButton onFilter={ onFilter } value={ blogSortingValue } options={ options } />
            )}
         </div>
      </div>
   );
};


BlogFilter.propTypes = {
   blog: PropTypes.array,
   blogSortingValue: PropTypes.any,
   onFilter: PropTypes.func,
   setSearchValue: PropTypes.func,
   searchValue: PropTypes.string,
   onClearSearch: PropTypes.func,
   isMultiSelected: PropTypes.bool,
   setIsMultiSelected: PropTypes.func,
   checkedItemsLength: PropTypes.any,
   onCheck: PropTypes.func,
   onRemoveSelected: PropTypes.func,
};

export default BlogFilter;
