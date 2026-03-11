import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import TextInput from 'components/elements/inputNew';
import './index.scss';

const WebHookCreateEdit = ({
   webHook,
   handleInputChange,
   trianglesData,
   setTrianglesData,
}) => {
   const toggleCheckbox = (type, checked) => {
      if (!checked) {
         if (type === 'All') {
            const newTrianglesData = trianglesData.map(item => {
               if (item.type === 'All') {
                  return { ...item, checked: !item.checked };
               }
               return { ...item, checked: false };
            });
            setTrianglesData(newTrianglesData);
         } else {
            const newTrianglesData = trianglesData.map(item => {
               if (item.type === 'All') {
                  return { ...item, checked: false };
               }
               if (item.type === type) {
                  return { ...item, checked: !item.checked };
               }
               return item;
            });
            setTrianglesData(newTrianglesData);
         }
      } else if (type === 'All') {
         const newTrianglesData = trianglesData.map(item => {
            if (item.type === 'All') {
               return { ...item, checked: !item.checked };
            }
            return { ...item, checked: false };
         });
         setTrianglesData(newTrianglesData);
      } else {
         const newTrianglesData = trianglesData.map(item => {
            if (item.type === 'All') {
               return { ...item, checked: false };
            }
            if (item.type === type) {
               return { ...item, checked: !item.checked };
            }
            return item;
         });
         setTrianglesData(newTrianglesData);
      }
   };


   return (
      <div className='webHookCreateEdit'>
         <div className='webHookCreateEditrectangle'>
            <div className='webHookCreateEditInputs'>
               <TextInput
                  placeholder='Example Name'
                  value={ webHook.name }
                  name='name'
                  label='Webhook Name'
                  onChange={ (name, value) => handleInputChange(name, value, 'webHook') }
               />
               <TextInput
                  placeholder='https://example.com/webhook'
                  value={ webHook.url }
                  name='url'
                  label='Webhook Url'
                  onChange={ (name, value) => handleInputChange(name, value, 'webHook') }
               />
            </div>
            <Text
               type={ textType.mediumSmall }
               size={ textSize.medium }
               style={ { marginBottom: '4px', display: 'block' } }
               inner='Event Trigger'
            />
            <Text
               type={ textType.regularDefault }
               size={ textSize.small }
               style={ { marginBottom: '24px', color: '#727978' } }
               inner='Select an event trigger'
            />
            <div className='webHookCreateEditCards'>
               {trianglesData.map((i) => {
                  return (
                     <div key={ i.id } className='webHookCreateEditCard' onClick={ () => toggleCheckbox(i.type, i.checked) } role='presentation'>
                        {i.checked ? <div className='webHookCreateEditCard__checkbox__checked' /> : <div className='webHookCreateEditCard__checkbox' /> }
                        <div className='webHookCreateEditCard__right'>
                           <Text
                              type={ textType.regularDefault }
                              size={ textSize.small }
                              inner={ i.type }
                           />
                           <Text
                              type={ textType.regularDefault }
                              size={ textSize.small }
                              inner={ i.text }
                              style={ { color: '#727978' } }
                              className='webHookCreateEditBelowTitle'
                           />
                        </div>
                     </div>
                  );
               })
               }
            </div>
         </div>
      </div>
   );
};

WebHookCreateEdit.defaultProps = {
   // webhookUrl: 'http//example.com/webhook',
};


WebHookCreateEdit.propTypes = {
   webHook: PropTypes.object,
   handleInputChange: PropTypes.func,
   trianglesData: PropTypes.array,
   setTrianglesData: PropTypes.func,
};

export default WebHookCreateEdit;
