import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import './index.scss';
import SearchInput from 'components/modules/mediaLibrary/SearchInput';
import moment from 'moment';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import MobileHeader from 'views/layout/MobileHeader';
// import DateInput from 'components/modules/mediaLibrary/DateInput';
import 'react-datepicker/dist/react-datepicker.css';

import DateInput from 'components/modules/mediaLibrary/DateInput';
import UploadWidget from 'components/elements/UploadWidget';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import Tooltip from 'components/elements/members/Tooltip';
import { formatToExtention } from 'utils/mediaLibrary';

const MediaLibraryHeader = ({
   onSearch, mediaTypes, activeTab, onChangeActiveTab, search,
   onSearchChange, onUpload, isFetchingData,
}) => {
   const [dateOpen, setDateOpen] = useState(false);
   const onDateChange = (date) => {
      const dateISEqualDateFrom = moment(date).isSame(search.date_from, 'day');
      if (dateISEqualDateFrom) return;
      if (search.date_from && search.date_to) {
         onSearchChange({ date_from: date, date_to: null });
      } else if (moment(date).isBefore(search.date_from)) {
         onSearchChange({ date_from: date, date_to: search.date_from });
      } else {
         onSearchChange('date_to', date);
      }
   };
   return (
      <>
         <MobileHeader>
            <SiteHeader
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader>
         <div className='mediaLibrary__header'>
            <div className='mediaLibrary__header__top'>
               <div className='mediaLibrary__title'>
                  <div className='flex'>
                     <Text
                        type={ textType.bold }
                        size={ textSizes.large }
                        inner='Media Library'
                     />
                     <Tooltip
                        hintText='On this page you are able to upload different types of files for your programs.'
                        hintStyle={ { bottom: 'auto', top: '22px', left: '-110px' } }
                     />
                  </div>
                  <div className='mediaLibrary__upload__mob'>
                     { !isFetchingData && (
                        <UploadWidget
                           format={ activeTab }
                           onLoadingEnd={ onUpload }
                           render={ (openWidget, disabled) => {
                              return (
                                 <div>
                                    <button
                                       type='button'
                                       disabled={ disabled }
                                       onClick={ openWidget }
                                    >
                                       <Icon name='upload' />
                                    </button>
                                 </div>

                              );
                           } }
                        />
                     )}

                  </div>
                  <div className='mediaLibrary__upload__desktop__small'>
                     { !isFetchingData && (
                        <UploadWidget
                           format={ activeTab }
                           onLoadingEnd={ onUpload }
                           render={ (openWidget, disabled) => {
                              return (
                                 <BaseButton
                                    theme={ btnTheme.darkGreen }
                                    size={ btnSizes.extraLarge }
                                    text='Upload'
                                    disabled={ disabled }
                                    onClick={ openWidget }
                                 />
                              );
                           } }
                        />
                     )}

                  </div>
               </div>
               <div className='mediaLibrary__search'>
                  <div className='mediaLibrary__search__search'>
                     <SearchInput
                        placeholder='Search for files'
                        name='search'
                        value={ search.search }
                        onChange={ onSearchChange }
                     />
                  </div>
                  <div className='mediaLibrary__search__date'>
                     <DateInput
                        from={ search.date_from }
                        to={ search.date_to }
                        onChange={ onDateChange }
                        focused={ dateOpen }
                        setFocused={ setDateOpen }
                     />
                  </div>
                  <div className='mediaLibrary__search__btn'>
                     <BaseButton
                        theme={ btnTheme.lightBlue }
                        size={ btnSizes.full }
                        text='Search'
                        onClick={ onSearch }
                     />
                  </div>
               </div>
               <div className='mediaLibrary__upload'>
                  { !isFetchingData && (
                     <UploadWidget
                        format={ activeTab }
                        onLoadingEnd={ onUpload }
                        render={ (openWidget, disabled) => {
                           return (
                              <BaseButton
                                 theme={ btnTheme.darkGreen }
                                 size={ btnSizes.extraLarge }
                                 text='Upload'
                                 disabled={ disabled }
                                 onClick={ openWidget }
                              />
                           );
                        } }
                     />
                  )}

               </div>
            </div>
            <div className='mediaLibrary__nav'>
               { mediaTypes.map(type => {
                  return (
                     <div
                        className={ cx('mediaLibrary__nav_item', { 'mediaLibrary__nav_item_active': type === activeTab }) }
                        onClick={ () => onChangeActiveTab(type) }
                        role='presentation'
                        key={ type }
                     >
                        {type}
                     </div>
                  );
               }) }
            </div>
            <div className='m-t-m acceptedMedias'>
               <Text
                  type={ textType.regular }
                  size={ textSizes.extraSmall }
                  inner={ `You can upload files with the extensions:${ formatToExtention[activeTab].map(_ => ` ${ _ }`).join(',') }` }
                  color='#8a94a2'
                  bold
               />
            </div>
         </div>
      </>
   );
};

MediaLibraryHeader.propTypes = {
   onSearch: PropTypes.func,
   onChangeActiveTab: PropTypes.func,
   onSearchChange: PropTypes.func,
   mediaTypes: PropTypes.array,
   activeTab: PropTypes.string,
   search: PropTypes.object,
   isFetchingData: PropTypes.bool,
   onUpload: PropTypes.func,
};

export default MediaLibraryHeader;
