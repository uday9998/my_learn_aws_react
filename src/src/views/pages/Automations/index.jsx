import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
// import AutomationHeader from 'views/layout/Automation/AutomationHeader';
// import AutomationContent from 'views/layout/Automation/AutomationContent';
import EmptyAutomation from 'views/pages/Automations/EmptyAutomation';
// import NoSearchSvg from 'assets/images/no-search-result.svg';
// import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
// import withLoading from 'utils/withLoading';
import HeaderTypeSecond from 'components/elements/HeaderTypes/HeaderTypeSecond';
import AdminContainer from 'views/layout/AdminContainer';
import Router from 'routes/router';
import AutomationListing from './AutomationListing';

// const AutomationContentLoading = withLoading('div');

const Automation = ({
   goTo, createAutomation, automations, handleDeleteAutomation, handleStatusChange,
   changeSearchValue, handleSearchClick, searchValue, getAutomationsInProgress, initialAutomationsLength,
   goToCreatePage, isMobile,
}) => {
   const openAutomation = (id) => {
      goTo(`${ Router.route('ADMIN_AUTOMATION_EDIT').getCompiledPath({ id }) }`);
   };
   return (
      <AdminContainer>
         <AdminContainer.Content>
            <div className='automation'>
               <HeaderTypeSecond
                  title='Automation'
                  // tooltip='asdas'
                  isHidenSearch={ initialAutomationsLength === 0 }
                  isHaveBaseButton={ initialAutomationsLength !== 0 }
                  searchValue={ searchValue }
                  buttonProps={ {
                     text: 'Create Automation',
                     iconName: 'PlusL',
                     iconColor: '#fff',
                     isIconRight: true,
                     isIconLeft: false,
                     isHidenDiv: false,
                     onClick: () => goToCreatePage(),
                  } }
                  onChangeSearchValue={ changeSearchValue }
               />
               {initialAutomationsLength === 0 ? (
                  <EmptyAutomation goToCreatePage={ goToCreatePage } />
               ) : (
                  <AutomationListing
                     handleStatusChange={ handleStatusChange }
                     data={ automations }
                     openAutomation={ openAutomation }
                     handleDeleteAutomation={ handleDeleteAutomation }
                     isMobile={ isMobile }
                  />
               )}
            </div>
         </AdminContainer.Content>
      </AdminContainer>
   );
   // return (
   //    <div className='automations'>
   //       <HeaderTypeSecond
   //          goTo={ goTo }
   //          title='Automation'
   //          tooltip='asd'
   //          isHaveBaseButton={true}
   //          createAutomation={ createAutomation }
   //          changeSearchValue={ changeSearchValue }
   //          handleSearchClick={ handleSearchClick }
   //          searchValue={ searchValue }
   //       />
   //       <AutomationContentLoading isLoading={ getAutomationsInProgress } className='AutomationTable'>
   //          {automations.length !== 0 ? (
   //             <AutomationContent
   //                goTo={ goTo }
   //                automations={ automations }
   //                handleDeleteAutomation={ handleDeleteAutomation }
   //                handleStatusChange={ handleStatusChange }
   //             />
   //          ) : (searchValue === '' && automations.length === 0
   //             && (
   //                <div className='noCredit'>
   //                   <EmptyAutomation createAutomation={ createAutomation } goTo={ goTo } />
   //                </div>
   //             ))
   //          }

   //          {automations.length === 0 && searchValue !== ''
   //             && (
   //                <div
   //                   className='noCredit'
   //                >
   //                   <img src={ NoSearchSvg } alt='noCredit' />
   //                   <Text
   //                      color='#8A94A8'
   //                      type={ TextType.normal }
   //                      size={ TextSize.small }
   //                      inner='No Search Results'
   //                   />
   //                </div>
   //             )
   //          }
   //       </AutomationContentLoading>
   //    </div>
   // );
};

Automation.propTypes = {
   goTo: PropTypes.func,
   createAutomation: PropTypes.func,
   automations: PropTypes.array,
   handleDeleteAutomation: PropTypes.func,
   handleStatusChange: PropTypes.func,
   handleSearchClick: PropTypes.func,
   changeSearchValue: PropTypes.func,
   searchValue: PropTypes.string,
   getAutomationsInProgress: PropTypes.bool,
   goToCreatePage: PropTypes.func,
   initialAutomationsLength: PropTypes.number,
   isMobile: PropTypes.bool,
};

export default Automation;
