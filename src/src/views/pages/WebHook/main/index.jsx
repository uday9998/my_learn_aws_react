import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { siteInfoSelector } from 'state/modules/common/selectors';

import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import PricingPopup from 'components/elements/PricingPopup';
import WebhookItem from './WebhookItem';

import './index.scss';


const WebHookMain = ({
   data, deleteWebhook, goToEditMode, goToCreateMode, goToLogs,
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState(false);

   const handleAddNewWebHook = () => {
      if (!Array.isArray(permissions)) {
         if (permissions.webhhoks) {
            goToCreateMode();
         } else {
            setPopupTitle('Webhooks');
            setShowPopup(true);
         } 
      } else {
         goToCreateMode();
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };


   return (
      <div className='webHookMain'>
         {
            showPopup && createPortal(<PricingPopup 
               handleClosePopup={ handleClosePopup }
               popupTitle={ popupTitle }
            />, document.body)
         }
         <div className='webHookMainHeaderTextButton'>
            <div className='webHookMain__title'>
               <Text
                  type={ textType.mediumSmall }
                  size={ textSize.medium }
                  inner='Add Your First Webhook'
               />
            </div>
            <div className='webhook_btns'>
               {/* <div>
                  <a href='https://support.miestro.com/article/277-how-to-create-a-webhook' alt='help' target='_blank' rel='noopener noreferrer'>
                  <BaseButton
                  size={ btnSize.full }
                  text='Help'
                  style={ { borderRadius: '0px', height: '40px' } }
                  onClick={ () => {} }
                  />
                  </a>
               </div> */}
               <div>
                  <BaseButton
                     size={ btnSize.full }
                     text='New Webhook'
                     onClick={ handleAddNewWebHook }
                  />
               </div>
            </div>
         </div>
         {!data.length ? (
            <Text
               type={ textType.regularDefault }
               size={ textSize.small }
               style={ { color: '#727978' } }
               inner='Webhook is a more advanced integration that allows you to send information from Miestro School to other online applications.'
            />
         ) : (
            <div className='webHookMain__table'>
               <table>
                  <thead>
                     <tr>
                        <th>
                           <Text
                              inner='Name'
                              type={ textType.mediumLarge }
                              size={ textSize.small }
                           />
                        </th>
                        <th>
                           <Text
                              inner='URL Link'
                              type={ textType.mediumLarge }
                              size={ textSize.small }
                           />
                        </th>
                        <th>
                           <Text
                              inner='Event Triggers'
                              type={ textType.mediumLarge }
                              size={ textSize.small }
                           />
                        </th>
                        <th>
                           <Text
                              inner='Status'
                              type={ textType.mediumLarge }
                              size={ textSize.small }
                           />
                        </th>
                        <th>
                           <Text
                              inner='Triggers'
                              type={ textType.mediumLarge }
                              size={ textSize.small }
                           />
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.map((webhook) => {
                        return (
                           <WebhookItem
                              onEdit={ () => goToEditMode(webhook.id) }
                              onDelete={ () => deleteWebhook(webhook.id) }
                              onLogs={ () => goToLogs(webhook.id) }
                              webhook={ webhook }
                              key={ webhook.created_at }
                           />
                        );
                     })}
                  </tbody>
               </table>
            </div>
         )}

      </div>
   );
};

WebHookMain.propTypes = {
   data: PropTypes.array,
   deleteWebhook: PropTypes.func,
   goToEditMode: PropTypes.func,
   goToCreateMode: PropTypes.func,
   goToLogs: PropTypes.func,
};

export default WebHookMain;
