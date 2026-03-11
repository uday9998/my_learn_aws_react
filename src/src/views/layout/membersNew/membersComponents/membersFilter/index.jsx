import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import AdvancedFilterNew from 'components/elements/members/AdvancedFilterNew';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Switch from 'components/elements/form/SwitchNew';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import DropTriggle from 'components/elements/newDropTriggle';
import { useWindowSizeChange } from 'utils/hooks/useWindowSizeChange';

const DropDownOptions = [
   { value: ':desc', key: 'Newest' },
   { value: ':asc', key: 'Oldest' },
   { value: '0', key: 'Name A to Z' },
   { value: '1', key: 'Name Z to A' },
];


const advancedFilterOptions = [
   { value: 'enrolled_in', label: 'Enrolled in' },
   { value: 'course_admin_of', label: 'Class admin of ' },
   { value: 'email', label: 'Email is' },
   { value: 'name', label: 'Full name is' },
   { value: 'last_login_', label: 'Last login was' },
   { value: 'from_to', label: 'Join date - From / To' },
];

const MembersFilter = ({
   onChange, filters, searchTo, searchFrom, searchValue, handleSearch, handleResetFilter,
   advancedFilterLogin, handleInternalInputChange, selectedAdvancedFilter, coursesOption, advancedFilterName,
   showOnlyMembers, setShowOnlyMembers, selectedSortedVariant,
}) => {
   const coursesOptions = coursesOption ? coursesOption.map((e) => ({ label: e.name, value: e.id })) : [];
   const [isOpenAdvancedFilter, setIsOpenAdvancedFilter] = useState(false);
   const [isOpenSortDropdown, setIsOpenSortDropdown] = useState(false);

   const { isMobile } = useWindowSizeChange();

   return (
      <div className='members__filter layout__members'>
         <div className='members__count'>
            {/* <div className='divider' /> */}
            {
               !isMobile && (
                  <div className='members_switch'>
                     <Switch
                        checked={ showOnlyMembers }
                        label='Show Members Only'
                        onChange={ (name, value) => setShowOnlyMembers(name, value) }
                     />
                  </div>
               )
            }
         </div>

         <div className='members__filter__left'>
            {
               !isMobile && (
                  <>
                     <div className='members__view__filter'>
                        <div
                           className={ `members__view__small ${ !filters.big && 'members__view__active' }` }
                           role='presentation'
                           onClick={ () => onChange('big', false) }
                        >
                           <div />
                           <div />
                           <div />
                        </div>
                        <div
                           className={ `members__view__big ${ filters.big && 'members__view__active' }` }
                           role='presentation'
                           onClick={ () => onChange('big', true) }
                        >
                           <div />
                           <div />
                        </div>
                     </div>
                     <div className='line' />
                  </>
               )
            }
            <div className='advanced__filter__section'>
               <BaseButton
                  theme={ btnTheme.secondary }
                  className='button__green'
                  iconName='FilterNew'
                  isActiveFilterButton={ isOpenAdvancedFilter }
                  isIconRight={ true }
                  text={ `Filter: ${ advancedFilterOptions.filter((filter) => filter.value === selectedAdvancedFilter)[0] ? advancedFilterOptions.filter((filter) => filter.value === selectedAdvancedFilter)[0].label : 'All' }` }
                  onClick={ () => setIsOpenAdvancedFilter(!isOpenAdvancedFilter) }
                  style={ {
                     height: '36px',
                     padding: '0 12px',
                     minHeight: 'auto',
                  } }
               />

               {isOpenAdvancedFilter && (
                  <AdvancedFilterNew
                     handleInternalInputChange={ handleInternalInputChange }
                     advancedFilterName={ advancedFilterName }
                     isOpen={ isOpenAdvancedFilter }
                     advancedFilterLogin={ advancedFilterLogin }
                     selectedCourses={ advancedFilterLogin }
                     searchTo={ searchTo }
                     searchFrom={ searchFrom }
                     searchValue={ searchValue }
                     handleSearch={ handleSearch }
                     coursesOption={ coursesOptions }
                     selectedAdvancedFilter={ selectedAdvancedFilter }
                     close={ () => {
                        setIsOpenAdvancedFilter(false);
                     } }
                     clear={ () => {
                        handleResetFilter();
                        setIsOpenAdvancedFilter(false);
                     } }
                  />
               )}
            </div>
            <div className='sorted__filter__section'>
               <BaseButton
                  theme={ btnTheme.secondary }
                  iconName='SortNew'
                  className='button__green'
                  isActiveFilterButton={ isOpenSortDropdown }
                  isIconRight={ true }
                  text={ `Sort By: ${ DropDownOptions.find((op) => op.value === selectedSortedVariant)?.key || '' }` }
                  onClick={ () => setIsOpenSortDropdown(true) }
                  style={ {
                     height: '36px',
                     padding: '0 12px',
                     minHeight: 'auto',
                  } }
               />
               {isOpenSortDropdown && (
                  <ClickOutside onClick={ () => setIsOpenSortDropdown(false) }>
                     <div className='sorted__filter__group'>
                        <div className='sorted__filter__drop'>
                           {DropDownOptions.map((item) => {
                              if (item.value === selectedSortedVariant) {
                                 return null;
                              }
                              return (
                                 <div
                                    role='presentation'
                                    className='sorted__filter__item'
                                    key={ item.value }
                                    onClick={ () => {
                                       // setSelectedSortedVariant(item.value);
                                       setIsOpenSortDropdown(false);
                                       handleSearch(
                                          null,
                                          null,
                                          null,
                                          null,
                                          null,
                                          false,
                                          item.value
                                       );
                                    } }
                                 >
                                    <Text
                                       inner={ item.key }
                                       style={ { padding: '16px 16px' } }
                                       type={ txtTypes.regular148 }
                                       size={ txtSizes.small }
                                    />
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </ClickOutside>
               )}
            </div>
            {
               isMobile && (
                  <div
                     className='members_more_options'
                  >
                     <DropTriggle
                        options={ [
                           {
                              trash: true,
                              component: (
                                 <div className='mobile_show_members_switch_wrapper'>
                                    <Switch
                                       checked={ showOnlyMembers }
                                       label='Show Members Only'
                                       onChange={ (name, value) => setShowOnlyMembers(name, value) }
                                    />
                                 </div>
                              ),
                           },
                        ] }
                     />
                  </div>
               )
            }
         </div>
      </div>
   );
};


MembersFilter.propTypes = {
   filters: PropTypes.object,
   advancedFilterName: PropTypes.any,
   handleInternalInputChange: PropTypes.func,
   advancedFilterLogin: PropTypes.any,
   handleSearch: PropTypes.func,
   selectedAdvancedFilter: PropTypes.any,
   coursesOption: PropTypes.array,
   onChange: PropTypes.func,
   searchTo: PropTypes.any,
   searchValue: PropTypes.string,
   searchFrom: PropTypes.any,
   handleResetFilter: PropTypes.func,
   // setSelectedSortedVariant: PropTypes.func,
   selectedSortedVariant: PropTypes.string,
   showOnlyMembers: PropTypes.bool,
   setShowOnlyMembers: PropTypes.func,
};

export default MembersFilter;
