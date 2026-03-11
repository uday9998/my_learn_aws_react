import React from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'components/modules/logOutPopup/OutsideClick';
import './index.scss';
import Text, { SIZES as textSizes, TYPES as textTypes } from 'components/elements/TextNew';
import Select from 'components/elements/SelectNew';
import MultiSelect from 'components/elements/multiSelectNew';
import Input from 'components/elements/inputNew';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';


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


const AdvancedFilterNew = ({
   isOpen, clear, searchValue, handleSearch, searchTo, searchFrom, close, advancedFilterLogin, selectedAdvancedFilter, handleInternalInputChange, advancedFilterName, coursesOption,
}) => {
   return (
      <ClickOutside onClick={ () => close() }>
         <div className='advanced__filter__modal'>
            <Text
               inner='Filter'
               type={ textTypes.regular148 }
               size={ textSizes.medium }
            />
            <Select
               options={ advancedFilterOptions }
               type='select-large'
               name='advancedFilterOption'
               onChange={ handleInternalInputChange }
               value={ selectedAdvancedFilter }
               placeholder='Select Filter'
               label='Advanced Filter'
            />
            {selectedAdvancedFilter && (
               <div className='middle__line' />
            )}

            <div className='advanced__filter__options'>
               {(selectedAdvancedFilter === 'enrolled_in' || selectedAdvancedFilter === 'course_admin_of')

                  && (
                     <MultiSelect
                        values={ advancedFilterName || [] }
                        options={ coursesOption }
                        placeholder='Choose course'
                        onRemove={ (value) => handleInternalInputChange('advancedFilterName', (advancedFilterName.filter((classId) => classId !== value))) }
                        onAdd={ (value) => handleInternalInputChange('advancedFilterName', ([...advancedFilterName, value])) }
                     />
                  )
               }
               {selectedAdvancedFilter === 'email'
                  && (
                     <Input
                        placeholder='Email'
                        id='advancedFilterEmail'
                        style={ { padding: '7px 16px' } }
                        name='advancedFilterName'
                        value={ advancedFilterName }
                        onChange={ (name, value) => handleInternalInputChange(name, value) }
                     />
                  )
               }
               {selectedAdvancedFilter === 'name'
                  && (
                     <Input
                        placeholder='Name'
                        id='advancedFilterName'
                        style={ { padding: '7px 16px' } }
                        name='advancedFilterName'
                        value={ advancedFilterName }
                        onChange={ (name, value) => handleInternalInputChange(name, value) }
                     />
                  )
               }
               {selectedAdvancedFilter === 'last_login_'
                  && (
                     <div className='advanced__filter__flex'>

                        <Select
                           id='advancedFilterLogin'
                           placeholder='after'
                           options={ afterBeforeOptions }
                           name='advancedFilterLogin'
                           type='select-large'
                           value={ advancedFilterLogin }
                           onChange={ (name, value) => handleInternalInputChange(name, value) }
                           icon='SelectNew'
                        />
                        <Input
                           onChange={ (name, value) => {
                              handleInternalInputChange(name, value);
                           } }
                           type='date'
                           name='advancedFilterName'
                           value={ advancedFilterName }
                        />
                     </div>
                  )
               }
               { selectedAdvancedFilter === 'from_to'
               && (
                  <div className='advanced__filter__flex'>
                     <Input
                        onChange={ (name, value) => {
                           handleInternalInputChange(name, value);
                        } }
                        type='date'
                        name='searchFrom'
                        value={ searchFrom }
                        placeholderText='From'
                     />
                     <Input
                        onChange={ (name, value) => {
                           handleInternalInputChange(name, value);
                        } }
                        type='date'
                        name='searchTo'
                        value={ searchTo }
                        placeholderText='To'
                     />
                  </div>
               )
               }
            </div>
            {selectedAdvancedFilter && (
               <div className='advanced__filter__modal__buttons'>
                  <BaseButton
                     text='Cancel'
                     theme={ btnTheme.secondary }
                     onClick={ () => {
                        clear();
                     } }
                  />
                  <BaseButton
                     text='Apply Filter'
                     onClick={ () => {
                        handleSearch(
                           searchValue, searchFrom, searchTo, selectedAdvancedFilter, advancedFilterName, true);
                     } }
                  />
               </div>
            )}
         </div>
      </ClickOutside>
   );
};

AdvancedFilterNew.propTypes = {
   close: PropTypes.func,
   handleInternalInputChange: PropTypes.func,
   isOpen: PropTypes.bool,
   coursesOption: PropTypes.any,
   advancedFilterLogin: PropTypes.string,
   advancedFilterName: PropTypes.any,
   clear: PropTypes.func,
   selectedAdvancedFilter: PropTypes.any,
   searchValue: PropTypes.string,
   searchTo: PropTypes.any,
   searchFrom: PropTypes.any,
   handleSearch: PropTypes.func,
};

export default AdvancedFilterNew;
