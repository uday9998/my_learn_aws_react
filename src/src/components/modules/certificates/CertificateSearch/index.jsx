import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/elements/form/Select';
import './index.scss';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';

const CertificateSearch = ({
   sortbyHandle, searchOnEnter, changeSearchValue, searchOnIconClick, searchValue, certificateSortingValue,
}) => {
   return (

      <>
         <div
            className='iconSearch'
         >
            <div className='search__input' role='presentation' onKeyDown={ (e) => searchOnEnter(e) }>
               <TextInput
                  label=''
                  placeholder='Search For Certificates'
                  name='searchField'
                  onChange={ (name, value) => changeSearchValue(value) }
                  style={ { paddingRight: '40px', height: '40px' } }
                  value={ searchValue }

               />
               <div role='presentation' onClick={ () => searchOnIconClick() }>
                  <Icon
                     name='Search'
                     color='#3f4f65'
                  />
               </div>
            </div>
         </div>
         <div
            className='sortBy'
         >
            <span className='filtersortByTitle'>
               <Text
                  color='#8a94a8'
                  type={ TextType.normal }
                  size={ TextSize.extraSmall }
                  inner='Sort By:'
               />
            </span>
            <div>
               <Select
                  placeholder='Name'
                  hasBorder
                  options={ [{ label: 'Name', value: 'name' }, { label: 'Date', value: 'date_added' }] }
                  onChange={ (name, value) => sortbyHandle(name, value) }
                  value={ certificateSortingValue }
                  style={ { padding: '7px 16px 7px 28px', height: '40px', width: '130px' } }
               />

            </div>
         </div>
      </>

   );
};

CertificateSearch.propTypes = {
   sortbyHandle: PropTypes.func,
   certificateSortingValue: PropTypes.string,
   searchOnEnter: PropTypes.func,
   searchOnIconClick: PropTypes.func,
   searchValue: PropTypes.string,
   changeSearchValue: PropTypes.func,
};

export default CertificateSearch;
