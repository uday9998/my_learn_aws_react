import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEME as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButton';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import TextInput from 'components/elements/form/TextInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'components/elements/form/Select';
import Icon from 'components/elements/Icon';

const CustomInput = React.forwardRef(({ onClick, value }) => (
   <input
      className='uk-input'
      onClick={ onClick }
      value={ value }
      type='text'
      readOnly={ true }
   />
));


const AdvancedFilter = ({
   searchValue, searchFrom, searchTo, handleInternalInputChange, handleSearch, coursesOption,
   advancedFilterOption, advancedFilterName, advancedFilterLogin,
   handleResetFilter, isFilterOpen, setIsFilterOpen,
}) => {
   const advancedFilterOptions = [
      { value: 'enrolled_in', label: 'Enrolled in' },
      { value: 'course_admin_of', label: 'Class admin of ' },
      { value: 'email', label: 'Email is' },
      { value: 'name', label: 'Full name is' },
      { value: 'last_login_', label: 'Last login was' },
      { value: 'from_to', label: 'Join date - From / To' },
   ];

   const afterBeforeOptions = [
      { value: 'last_login_after', label: 'after' },
      { value: 'last_login_before', label: 'before' },
   ];

   return (
      <div className='advancedFilter'>
         <div className='marginRight' onClick={ () => { setIsFilterOpen(!isFilterOpen); handleResetFilter(); } } role='presentation'>
            <Text
               type={ textType.normal }
               size={ textSizes.extraSmall }
               inner='Advanced Filter'
            />
            <div style={ { transform: !isFilterOpen ? 'rotateX(180deg)' : 'rotateX(0deg)', top: !isFilterOpen ? '-3px' : '0px' } }>
               <Icon name='TriangleDown' />
            </div>

         </div>
         {isFilterOpen
         && (
         <>
            <div className='searchFilter__inputs'>
               <div className='flex-2 searchFilter__input'>
                  <Select
                     style={ { height: '40px' } }
                     id='course'
                     placeholder='Select Filter'
                     options={ advancedFilterOptions }
                     name='advancedFilterOption'
                     value={ advancedFilterOption }
                     onChange={ (name, value) => handleInternalInputChange(name, value) }
                     icon='SelectNew'
                  />
               </div>
               {(advancedFilterOption === 'enrolled_in' || advancedFilterOption === 'course_admin_of')
                  && (
                     <div className='m-l-m flex-2 searchFilter__input'>
                        <Select
                           style={ { height: '40px' } }
                           id='course'
                           placeholder='Choose Class'
                           options={ coursesOption }
                           name='advancedFilterName'
                           value={ advancedFilterName }
                           onChange={ (name, value) => handleInternalInputChange(name, value) }
                           icon='SelectNew'
                        />
                     </div>
                  )
               }

               {advancedFilterOption === 'email'
                  && (
                     <div className=' m-l-m  flex-1 searchFilter__input'>
                        <TextInput
                           placeholder='Email'
                           id='advancedFilterEmail'
                           style={ { padding: '7px 16px' } }
                           name='advancedFilterName'
                           value={ advancedFilterName }
                           onChange={ (name, value) => handleInternalInputChange(name, value) }
                           onKeyPress={ event => {
                              if (event.key === 'Enter') {
                                 if (!(!advancedFilterName || (advancedFilterName && advancedFilterName.trim && advancedFilterName.trim().length === 0))) {
                                    // eslint-disable-next-line max-len
                                    handleSearch(searchValue, searchFrom, searchTo, advancedFilterOption, advancedFilterName, true);
                                 }
                              }
                           } }
                        />
                     </div>
                  )
               }

               {advancedFilterOption === 'name'
                  && (
                     <div className=' m-l-m  flex-1 searchFilter__input'>
                        <TextInput
                           placeholder='Name'
                           id='advancedFilterName'
                           style={ { padding: '7px 16px' } }
                           name='advancedFilterName'
                           value={ advancedFilterName }
                           onChange={ (name, value) => handleInternalInputChange(name, value) }
                           onKeyPress={ event => {
                              if (event.key === 'Enter') {
                                 if (!(!advancedFilterName || (advancedFilterName && advancedFilterName.trim && advancedFilterName.trim().length === 0))) {
                                    // eslint-disable-next-line max-len
                                    handleSearch(searchValue, searchFrom, searchTo, advancedFilterOption, advancedFilterName, true);
                                 }
                              }
                           } }
                        />
                     </div>
                  )
               }

               {advancedFilterOption === 'last_login_'
                  && (
                     <>
                        <div className='m-l-exs flex-1 searchFilter__input'>
                           <Select
                              style={ { height: '40px' } }
                              id='advancedFilterLogin'
                              placeholder='after'
                              options={ afterBeforeOptions }
                              name='advancedFilterLogin'
                              value={ advancedFilterLogin }
                              onChange={ (name, value) => handleInternalInputChange(name, value) }
                              icon='SelectNew'
                           />
                        </div>
                        <div className=' m-l-m  flex-2 searchFilter__input'>
                           <DatePicker
                              selected={ advancedFilterName }
                              onChange={ date => handleInternalInputChange('advancedFilterName', date) }
                              selectsStart
                              placeholderText='Date'
                              customInput={ <CustomInput /> }
                           />
                           <span className='calendar'>
                              <Icon name='Calendar' />
                           </span>

                        </div>
                     </>
                  )
               }


               { advancedFilterOption === 'from_to'
               && (
               <>
                  <div className='m-l-m m-r-m flex-1 searchFilter__input'>
                     <DatePicker
                        selected={ searchFrom }
                        onChange={ date => handleInternalInputChange('searchFrom', date) }
                        selectsStart
                        startDate={ searchFrom }
                        endDate={ searchTo }
                        placeholderText='From'
                        customInput={ <CustomInput /> }
                     />
                  </div>
                  <div className='flex-1 searchFilter__input'>
                     <DatePicker
                        selected={ searchTo }
                        onChange={ date => handleInternalInputChange('searchTo', date) }
                        selectsEnd
                        startDate={ searchFrom }
                        endDate={ searchTo }
                        minDate={ searchFrom }
                        placeholderText='To'
                        customInput={ <CustomInput /> }
                     />
                  </div>
               </>
               )
               }


               <div className='m-l-m searchFilter__close' onClick={ () => { setIsFilterOpen(!isFilterOpen); handleResetFilter(); } } role='presentation'>
                  <Icon name='CloseXNew' />
               </div>


               {/* <div className=' m-l-m  flex-1 searchFilter__input'>
                  <TextInput
                     placeholder='Name or Email'
                     id='nameOrEmail'
                     style={ { padding: '7px 16px' } }
                     name='searchValue'
                     value={ searchValue }
                     onChange={ (name, value) => handleInternalInputChange(name, value) }
                  />
               </div>

               <div className='m-l-m m-r-m flex-1 searchFilter__input'>
                  <DatePicker
                     selected={ searchFrom }
                     onChange={ date => handleInternalInputChange('searchFrom', date) }
                     selectsStart
                     startDate={ searchFrom }
                     endDate={ searchTo }
                     placeholderText='From'
                  />
               </div>
               <div className='flex-1 searchFilter__input'>
                  <DatePicker
                     selected={ searchTo }
                     onChange={ date => handleInternalInputChange('searchTo', date) }
                     selectsEnd
                     startDate={ searchFrom }
                     endDate={ searchTo }
                     minDate={ searchFrom }
                     placeholderText='To'
                  />
               </div> */}
            </div>
            <div className='m-t-m searchFilter__button'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSizes.large }
                  id='myBtn'
                  text='Apply Filters'
                  style={ { fontSize: '14px' } }
                  disabled={ advancedFilterOption === 'from_to' ? !(!!searchFrom || !!searchTo) : (!advancedFilterName || (advancedFilterName && advancedFilterName.trim && advancedFilterName.trim().length === 0)) }
                  onClick={ () => handleSearch(
                     searchValue, searchFrom, searchTo, advancedFilterOption, advancedFilterName, true) }
               />
            </div>
         </>
         )
         }
      </div>
   );
};

AdvancedFilter.propTypes = {
   searchValue: PropTypes.string,
   coursesOption: PropTypes.array,
   searchFrom: PropTypes.any,
   searchTo: PropTypes.any,
   handleInternalInputChange: PropTypes.func,
   handleSearch: PropTypes.func,
   advancedFilterOption: PropTypes.string,
   advancedFilterName: PropTypes.any,
   advancedFilterLogin: PropTypes.string,
   handleResetFilter: PropTypes.func,
   isFilterOpen: PropTypes.bool,
   setIsFilterOpen: PropTypes.func,
};

AdvancedFilter.defaultProps = {
   advancedFilterOption: '',
   advancedFilterName: '',
   coursesOption: [],
   searchFrom: '',
   searchTo: '',
   handleInternalInputChange: () => {},
   handleSearch: () => {},
};

CustomInput.propTypes = {
   onClick: PropTypes.func,
   value: PropTypes.any,
};

export default AdvancedFilter;
