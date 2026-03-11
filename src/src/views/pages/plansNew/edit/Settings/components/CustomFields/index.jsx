import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes, TextWithIcon } from 'components/elements/TextNew';
import Line from 'components/elements/Line';
import Input from 'components/elements/inputNew';
import BaseButton, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import IconNew from 'components/elements/iconsSize';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { editCustomField } from 'api';

const AdvancedCustomFields = ({
   items, onChange, addCustomField, checkedIds, deleteCustomField,
}) => {
   const [isOnEdit, setIsOnEdit] = useState(false);
   const [deletedIds, setDeletedIds] = useState([]);
   const [isOpenCustomField, setIsOpenCustomField] = useState(false);
   const [input, setInput] = useState('');
   const [editInputs, setEditInputs] = useState([]);
   const [editFields] = useSubmitForm(editCustomField);

   useEffect(() => {
      setEditInputs(items);
   }, []);

   useEffect(() => {
      setEditInputs(items);
   }, [items]);

   const odEditButtonClick = () => {
      setIsOnEdit(true);
      setDeletedIds([]);
   };

   const handleItemCheck = (id, item) => {
      if (_.some(checkedIds, ['id', id])) {
         onChange('custom_fields', checkedIds.filter((e) => e.id !== id));
         return;
      }
      onChange('custom_fields', [...checkedIds, item]);
   };

   const handleChangeInput = (name, value, id) => {
      setEditInputs(prevState => {
         return prevState.map(inputValue => {
            if (inputValue.id === id) {
               return {
                  ...inputValue,
                  name: value,
               };
            }

            return inputValue;
         });
      });
   };

   const handleSave = () => {
      if (deletedIds.length) {
         deleteCustomField(deletedIds);
      }
      editFields(editInputs);
      setDeletedIds([]);
      setIsOnEdit(false);
   };

   return (
      <div className='plan__advanced__fields'>
         <div className='plan__advanced__fields__top'>
            <Text
               inner='Custom Fields'
               type={ types.medium153 }
               size={ sizes.large }
            />
            <Text
               inner='Add more fields to your Checkout Page'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#444C4B' } }
            />
         </div>
         <div className='plan__advanced__fields__bottom'>
            {!isOnEdit && (
               <div className='plan__advanced__fields__bottom__edit'>
                  <TextWithIcon
                     iconName='EditPlanM'
                     inner='Edit'
                     onClick={ odEditButtonClick }
                     type={ types.regularMin }
                     size={ sizes.small }
                     style={ { color: '#24554E' } }
                     generalStyles={ { cursor: 'pointer' } }
                  />
               </div>
            )}
            <div className='plan__advanced__fields__bottom__items'>
               {items.length > 0 ? (
                  <>
                     {items.map((e, index) => {
                        if (isOnEdit && deletedIds.includes(e.id)) {
                           return null;
                        }
                        return (
                           <div
                              key={ index }
                              className='plan__advanced__fields__bottom__item'
                           >
                              <div className='plan__advanced__fields__bottom__item__left'>
                                 <CheckBox
                                    checked={ _.some(checkedIds, ['id', e.id]) }
                                    onChange={ () => handleItemCheck(e.id, e) }
                                 />
                                 {
                                    isOnEdit ? (
                                       <Input 
                                          value={ editInputs[index].name }
                                          onChange={ (name, value) => handleChangeInput(name, value, e.id) }
                                          name={ e.name }
                                       />
                                    ) : (
                                       <Text
                                          inner={ editInputs[index]?.name ? editInputs[index]?.name : e.name }
                                          type={ types.regularDefault }
                                          size={ sizes.small }
                                       />
                                    )
                                 }
                              </div>
                              {isOnEdit && (
                                 <div
                                    role='presentation'
                                    onClick={ () => setDeletedIds([...deletedIds, e.id]) }
                                    className='plan__advanced__fields__bottom__item__right'
                                 >
                                    <IconNew name='RemoveCustomFieldM' />
                                 </div>
                              )}
                           </div>
                        );
                     })}
                  </>
               ) : (
                  <Text
                     inner='No Custom Fields'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: 'rgb(114, 121, 120)', textAlign: 'center' } }
                  />
               )}
            </div>
            {isOnEdit ? (
               <div className='plan__advanced__fields__bottom__buttons'>
                  <BaseButton
                     theme={ themes.secondary }
                     text='Cancel'
                     onClick={ () => {
                        setDeletedIds([]);
                        setIsOnEdit(false);
                     } }
                  />
                  <BaseButton
                     text='Save'
                     onClick={ handleSave }
                  />
               </div>
            ) : (
               <>
                  {isOpenCustomField ? (
                     <div className='plan__advanced__fields__custom'>
                        <Line />
                        <Input
                           value={ input }
                           onChange={ (n, value) => setInput(value) }
                           label='Custom Field'
                           placeholder='Enter Custom Field Value'
                        />
                        <div className='plan__advanced__fields__custom__buttons'>
                           <BaseButton
                              theme={ themes.secondary }
                              text='Cancel'
                              onClick={ () => {
                                 setIsOpenCustomField(false);
                                 setInput('');
                              } }
                           />
                           <BaseButton
                              text='Add'
                              disabled={ input.length === 0 }
                              onClick={ () => {
                                 if (!items.find(item => item.name === input)) {
                                    setInput('');
                                    addCustomField(input);
                                    setIsOpenCustomField(false);
                                 } else {
                                    toast.error('The custom field name should be unique.');
                                 }
                              } }
                           />
                        </div>
                     </div>
                  ) : (
                     <div className='plan__advanced__fields__bottom__icon'>
                        <TextWithIcon
                           iconName='plusPlanM'
                           inner='Add Custom Field'
                           onClick={ () => setIsOpenCustomField(true) }
                           type={ types.regularMin }
                           size={ sizes.small }
                           style={ { color: '#24554E' } }
                           generalStyles={ { cursor: 'pointer' } }
                        />
                     </div>
                  )}
               </>
            )}
         </div>
      </div>
   );
};

AdvancedCustomFields.propTypes = {
   items: PropTypes.array,
   onChange: PropTypes.func,
   checkedIds: PropTypes.array,
   addCustomField: PropTypes.func,
   deleteCustomField: PropTypes.func,
};

export default AdvancedCustomFields;
