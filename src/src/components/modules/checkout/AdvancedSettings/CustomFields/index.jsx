import React, { useState } from 'react';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import NewCustomField from 'components/modules/checkout/AdvancedSettings/CustomFields/NewCustomField';
import CustomFieldsTable from 'components/modules/checkout/AdvancedSettings/CustomFields/CustomFieldsTable';
import PropTypes from 'prop-types';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import {
   createCustomField, deleteCustomField, updateCustomField,
} from 'api/AuthApi';
import Modal from 'components/elements/Modal';
import withLoading from 'utils/withLoading';
import './index.scss';

const CustomFieldsLoading = withLoading('div');

const CustomFields = ({
   course, customFieldsData, setCustomFields,
}) => {
   const customFields = customFieldsData && customFieldsData.custom_field;
   const [isCustomField, setIsCustomField] = useState(false);
   const [currentCustomField, setCurrentCustomField] = useState({});

   const [createCustomFieldFunc, { loading: loadingCreate }] = useSubmitForm(createCustomField, {
      successMessage: 'Custom field has been created.',
   });
   const [updateCustomFieldFunc, { loading: loadingUpdate }] = useSubmitForm(updateCustomField, {
      successMessage: 'Custom field has been updated.',
   });
   const [deleteCustomFieldFunc] = useSubmitForm(deleteCustomField, {
      successMessage: 'Custom field has been deleted.',
   });

   const handleCreateCustomFieldFunc = (customFieldName) => {
      createCustomFieldFunc({ courseId: course.id, name: customFieldName }, (res) => {
         if (res && !res.original) {
            setCustomFields(
               {
                  ...customFieldsData,
                  custom_field: [
                     ...customFieldsData.custom_field,
                     res,
                  ],
               }
            );
            setIsCustomField(false);
         }
      });
   };

   const handleDeleteCustomFieldFunc = (customFieldId) => {
      deleteCustomFieldFunc({ courseId: course.id, customFieldId }, () => {
         const updatedCustomField = customFields.filter(customField => customField.id !== customFieldId);
         setCustomFields({ custom_field: updatedCustomField });
      });
   };

   const handleUpdateCustomFieldFunc = (customFieldName) => {
      const editedCustomField = { courseId: course.id, name: customFieldName, id: currentCustomField.id };
      if (currentCustomField.name !== customFieldName) {
         updateCustomFieldFunc(editedCustomField, (res) => {
            if (res && !res.original) {
               // eslint-disable-next-line max-len
               const updatedCustomField = customFields.filter(customField => customField.id === editedCustomField.id)[0];
               updatedCustomField.name = editedCustomField.name;
               setCustomFields(customFieldsData);
               setIsCustomField(false);
               setCurrentCustomField({});
            }
         });
      }
   };

   const chooseCustomField = (customField) => {
      setCurrentCustomField(customField);
      setIsCustomField(true);
   };

   return (
      <CustomFieldsLoading className='customFields' isLoading={ loadingCreate || loadingUpdate }>
         <div className='fields-container'>
            <div className='custom-field'>
               <Text
                  size={ TextSize.medium }
                  type={ TextType.bold }
                  inner='Custom Fields'
                  color='#3f4f65'
               />
            </div>
            {customFields && customFields.length < 10 && (
               <div className='custom-field-btn'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.extraLargeNarrow }
                     text='New Field'
                     onClick={ () => setIsCustomField(true) }
                  />
               </div>
            )}

         </div>
         {isCustomField && (
            <Modal
               blurColor='rgba(63, 79, 101, 0.6)'
               contentBgColor='#fff'
               contentPosition='center'
               closeOnClickOutside={ true }
               contentWidth={ window.innerWidth >= 1024 ? '500px' : '300px' }
               onClose={ () => setIsCustomField(false) }
            >
               <NewCustomField
                  handleCustomFieldFunc={
                     currentCustomField.id ? handleUpdateCustomFieldFunc : handleCreateCustomFieldFunc }
                  setIsCustomField={ setIsCustomField }
                  currentCustomField={ currentCustomField }
                  setCurrentCustomField={ setCurrentCustomField }
               />
            </Modal>
         )}
         {customFields && !!customFields.length
         && (
            <CustomFieldsTable
               customFields={ customFields }
               handleDeleteCustomFieldFunc={ handleDeleteCustomFieldFunc }
               chooseCustomField={ chooseCustomField }
            />
         )}
      </CustomFieldsLoading>
   );
};

CustomFields.propTypes = {
   course: PropTypes.object,
   setCustomFields: PropTypes.func,
   customFieldsData: PropTypes.object,
};

export default CustomFields;
