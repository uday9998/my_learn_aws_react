/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import CreatableSelect from 'react-select/creatable';
import Tooltip from 'components/elements/members/Tooltip';

const WritableSelect = ({
   placeholder, label, id, values, options, onSelect, onDelete, onCreate,
   className, tooltip, tooltipText, tooltipTag, isMemberTags,
}) => {
   const customStyles = {
      control: (provided, state) => ({
         display: 'flex',
         alignItems: 'center',
         borderRadius: '4px',
         // border: 'solid 1px #cddaf1',
         backgroundColor: '#fbfdff',
         // padding: '6px',
         border: state.isFocused ? 'solid 1px #fbfdff' : 'solid 1px #cddaf1',
         boxShadow: state.isFocused ? '0 0 0px 2px #7cb740' : '',
      }),
      multiValue: () => ({
         display: 'flex',
         alignItems: 'baseline',
         borderRadius: '40px',
         backgroundColor: '#e1eeff',
         width: 'max-content',
         padding: '5px 16px',
         margin: '2px 2px',
      }),
      option: (provided, state) => ({
         backgroundColor: state.isFocused ? '#eee' : '#fff',
         padding: '10px',
      }),
   };


   const renderedOptions = options.reduce((forSelect, option) => {
      if (!values.some(val => val.name === option.name)) {
         return [...forSelect, { label: option.name, value: option.id }];
      }
      return forSelect;
   }, []);

   const value = values.map(val => ({
      label: val.name,
      value: val.id,
   }));

   const handleChange = (newValue, action) => {
      if (action.action === 'remove-value') {
         const removeId = action.removedValue.value;
         onDelete(removeId);
      }
      if (action.action === 'select-option') {
         const selectId = action.option.value;
         onSelect(selectId);
      }
      if (action.action === 'create-option') {
         const addedValue = newValue[newValue.length - 1];
         onCreate(addedValue);
      }
   };

   return (
      <div className={`writableSelect ${className}`}>
         <label htmlFor={id}>
            <div className='tooltip-content'>
               <Text
                  size={txtSizes.extraSmall}
                  type={txtType.normal}
                  inner={label || ''}
               />
               {tooltip && !isMemberTags
                  && (
                     <Tooltip
                        hintText={tooltipText}
                        style={!tooltipTag ? { top: '-3px' } : { top: '-2px' }}
                     />
                  )
               }
            </div>
            <CreatableSelect
               isMulti
               onChange={handleChange}
               options={renderedOptions}
               styles={customStyles}
               placeholder={placeholder}
               value={value}
               isClearable={false}
            />
         </label>
      </div>
   );
};

WritableSelect.propTypes = {
   placeholder: PropTypes.string,
   label: PropTypes.string,
   className: PropTypes.string,
   id: PropTypes.string,
   values: PropTypes.array,
   options: PropTypes.array,
   onSelect: PropTypes.func,
   onDelete: PropTypes.func,
   onCreate: PropTypes.func,
   tooltip: PropTypes.bool,
   tooltipText: PropTypes.string,
   tooltipTag: PropTypes.bool,
   isMemberTags: PropTypes.bool,
};

WritableSelect.defaultProps = {
   values: [],
   onSelect: () => { },
   onDelete: () => { },
   onCreate: () => { },
   options: [],
   tooltip: false,
   tooltipText: 'Add your categories to your Portal here.',
};

export default WritableSelect;
