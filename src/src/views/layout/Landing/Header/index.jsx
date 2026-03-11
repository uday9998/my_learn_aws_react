import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import './index.scss';
import SearchInput from 'components/modules/mediaLibrary/SearchInput';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import MobileHeader from 'views/layout/MobileHeader';

const LandingHeader = ({
   hanldeNewPages, title, isEditMode, goToBack, getLandingsFiltered, searchValue, setSearchValue,
}) => {
   return (
      <>
         <MobileHeader>
            <SiteHeader
               isLeftAction
               goToBack={ () => goToBack() }
            />
         </MobileHeader>
         <div className='landing__header'>
            <div className='landing__header_main'>
               <div className='landing__title flex'>
                  <Text
                     type={ textType.bold }
                     size={ textSizes.large }
                     inner={ title }
                  />
                  {/* <Tooltip
                     hintText='Create, edit and publish your landing posts.'
                     hintStyle={ { width: '270px', bottom: '22px' } }
                  /> */}
               </div>
               {isEditMode && (
                  <div className='landing__search'>
                     <div
                        role='presentation'
                        className='landing__search__input'
                        onKeyDown={ (e) => {
                           if (e.key === 'Enter') {
                              getLandingsFiltered(searchValue);
                           }
                        } }
                     >
                        <SearchInput
                           placeholder='Search For Pages'
                           name='searchValue'
                           value={ searchValue }
                           onChange={ (name, value) => setSearchValue(value) }
                        />
                     </div>
                     <div className='landing__search__btn'>
                        <BaseButton
                           theme={ btnTheme.lightBlue }
                           size={ btnSizes.large }
                           text='Search'
                           onClick={ () => getLandingsFiltered(searchValue) }
                        />
                     </div>
                  </div>
               )}
               {
                  isEditMode && (
                     <div className='landing__create'>
                        <div className='landing__btn'>
                           <BaseButton
                              theme={ btnTheme.darkGreen }
                              size={ btnSizes.large }
                              text='New Pages'
                              onClick={ () => hanldeNewPages() }
                           />
                        </div>
                     </div>
                  )
               }
            </div>
            <div className='landing__search__mob'>
               <div
                  className='landing__search__input'
                  role='presentation'
                  onKeyDown={ (e) => {
                     if (e.key === 'Enter') {
                        getLandingsFiltered(searchValue);
                     }
                  } }
               >
                  <SearchInput
                     placeholder='Search'
                     name='searchValue'
                     value={ searchValue }
                     onChange={ (name, value) => setSearchValue(value) }
                  />
               </div>
               <div className='landing__search__btn'>
                  <BaseButton
                     theme={ btnTheme.lightBlue }
                     size={ btnSizes.large }
                     text='Search'
                     onClick={ () => getLandingsFiltered(searchValue) }
                  />
               </div>
            </div>
         </div>

      </>
   );
};

LandingHeader.propTypes = {
   hanldeNewPages: PropTypes.func,
   title: PropTypes.string,
   getLandingsFiltered: PropTypes.func,
   isEditMode: PropTypes.bool,
   goToBack: PropTypes.func,
   searchValue: PropTypes.string,
   setSearchValue: PropTypes.func,
};


export default LandingHeader;
