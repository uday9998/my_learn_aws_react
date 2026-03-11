import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import './index.scss';
import SearchInput from 'components/modules/mediaLibrary/SearchInput';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import Modal from 'components/elements/Modal';
import CreateAutomationModalContent from 'components/modules/automation/CreateAutomationModalContent';
import SiteHeader from 'containers/modules/siteheader/index.mob';
import { useHistory } from 'react-router-dom';
import Icon from 'components/elements/Icon';


const AutomationHeader = ({
   goTo, createAutomation, changeSearchValue, handleSearchClick, searchValue,
}) => {
   const history = useHistory();
   const [isOpenCreate, setIsOpenCreate] = useState(false);
   return (
      <>
         {/* <MobileHeader>
            <SiteHeader
               isLeftAction
               goToBack={ () => {} }
            />
         </MobileHeader> */}
         <SiteHeader
            title='Automations'
            goToBack={ () => history.goBack() }
            goBack
            isLeftAction
         />
         <div className='automation__header'>
            <div className='automation__title'>
               {(
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <div
                     className='m-r-exs left-icon'
                     onClick={ () => history.goBack() }
                  >
                     <Icon
                        name='Left'
                     />
                  </div>
               )}
               <Text
                  type={ textType.bold }
                  size={ textSizes.large }
                  inner='Automations'
               />
            </div>
            <div className='automation__search'>
               <div
                  className='automation__search__input'
                  role='presentation'
                  // onKeyDown={ (e) => {
                  //    if (e.key === 'Enter') {
                  //       handleSearchClick();
                  //    }
                  // } }
               >
                  <SearchInput
                     placeholder='Search'
                     name='searchValue'
                     value={ searchValue }
                     onChange={ (name, value) => changeSearchValue(name, value) }

                  />
               </div>
               {/* <div className='automation__search__btn'>
                  <BaseButton
                     theme={ btnTheme.lightBlue }
                     size={ btnSizes.large }
                     text='Search'
                     onClick={ handleSearchClick }
                  />
               </div> */}
            </div>
            <div className='automation__create'>
               <div className='mediaLibrary__search__btn'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSizes.large }
                     text='Create Automation'
                     onClick={ () => setIsOpenCreate(!isOpenCreate) }
                  />
               </div>
            </div>
            {isOpenCreate && (
               <Modal
                  blurColor='rgba(63, 79, 101, 0.6)'
                  contentBgColor='#fff'
                  contentPosition='center'
                  closeOnClickOutside={ true }
                  onClose={ () => setIsOpenCreate(false) }
                  contentWidth={ window.innerWidth >= 1024 ? '945px' : '100%' }
               >
                  <CreateAutomationModalContent
                     setIsOpenCreate={ setIsOpenCreate }
                     goTo={ goTo }
                     createAutomation={ createAutomation }
                  />
               </Modal>
            )
            }
         </div>
      </>
   );
};

AutomationHeader.propTypes = {
   goTo: PropTypes.func,
   createAutomation: PropTypes.func,
   handleSearchClick: PropTypes.func,
   changeSearchValue: PropTypes.func,
   searchValue: PropTypes.string,
};

// AutomationHeader.defaultProps = {
//    onSearch:() => {},
//    onChangeActiveTab: () => {},
//    onSearchChange: () => {},
//    mediaTypes: [],
//    activeTab: '',
//    search: {},
//    isFetchingData: false,
//    onUpload: () => {},
// };

export default AutomationHeader;
