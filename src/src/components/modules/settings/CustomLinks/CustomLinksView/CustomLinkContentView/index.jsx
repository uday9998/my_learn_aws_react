import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import {
   sortableHandle,
} from 'react-sortable-hoc';
import { checkLink } from 'utils/checkLink.js';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import './index.scss';
import { isLocalhost } from 'utils/Helpers';
import AddCustomLinkContent from 'components/modules/settings/CustomLinks/AddCustomLinkContent';
import IToolTipNew from 'components/elements/IToolTipNew';

const DragHandle = sortableHandle(() => (
   <IconNew name='dragS' />
));

const CustomLinkContentView = ({
   customItem, deleteCustomLink, customLinks, setCustomLinks, handleUpdateCustomLinkFunc, links,
   loading, header,
}) => {
   const baseUrl = document.querySelector('meta[name="base_url"]')?.getAttribute('content');

   const apiUrl = (isLocalhost()) ? process.env.REACT_APP_API_LOCAL_ENDPOINT : (baseUrl || window.location.origin);

   const [updateItem, setUpdateItem] = useState(false);


   const getHrefName = (value) => {
      let newValue = value;
      if (value === `${ apiUrl }/offers`) {
         newValue = 'Offer Page';
      } else if (value === `${ apiUrl }/my-account`) {
         newValue = 'Portal';
      } else if (value === `${ apiUrl }/my-account#saved`) {
         newValue = 'My Saved Courses';
      } else if (value === `${ apiUrl }/terms`) {
         newValue = 'Terms of Use';
      } else if (value === `${ apiUrl }/privacy`) {
         newValue = 'Privacy Policy';
      }
      return newValue;
   };

   const resetCustomLink = () => {
      if (setUpdateItem) {
         setUpdateItem(false);
      }
   };

   return (
      <div
         className='customLink__view'
      >
         <div
            className='customLink__title_content'
         >
            {!updateItem && links.length > 1 && (
               <div>
                  <DragHandle />
               </div>
            )}
            {updateItem && (
               <AddCustomLinkContent
                  customItem={ customItem }
                  resetCustomLink={ resetCustomLink }
                  header={ header }
                  updateCustomLink={ handleUpdateCustomLinkFunc }
                  customLinks={ customLinks }
                  setCustomLinks={ setCustomLinks }
                  setUpdateItem={ setUpdateItem }
                  getHrefName={ getHrefName }
                  loading={ loading }
               />
            )}
            {!updateItem && (
               <div className='customLinks__createModal'>
                  <div className='createModal__content'>
                     <div className='m-t-m createModal__select'>
                        <div>
                           <Text
                              inner={ customItem.text }
                              type={ types.regularDefault }
                              size={ sizes.small14 }
                           />
                        </div>
                        <div>
                           <Text
                              inner={ `URL Link: ${ getHrefName(customItem.href) }` }
                              type={ types.regularDefault }
                              size={ sizes.small14 }
                           />
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
         {!updateItem && (
            <div className='customLink__actions'>
               <div
                  className='customLink__edit'
                  role='presentation'
                  title='Open in new tab'
                  onClick={ (customItem.fixed === 1 || getHrefName(customItem.href) === 'Terms of Use'
                   || getHrefName(customItem.href) === 'Privacy Policy') ? null : () => {
                        window.open(checkLink(customItem.href), '_blank');
                     } }
                  style={ (customItem.fixed === 1 || getHrefName(customItem.href) === 'Terms of Use'
                  || getHrefName(customItem.href) === 'Privacy Policy') ? { opacity: '0.2' } : {} }

               >
                  <IToolTipNew tooltip='Open in new tab' iconName='ExternalLinkM' id={ `${ customItem.id }` } className='whiteTooltip' />
               </div>
               <div
                  className='customLink__delete'
                  title='Edit'
                  role='presentation'
                  onClick={ customItem.fixed === 1 ? null : () => setUpdateItem(true) }
                  style={ customItem.fixed === 1 ? { opacity: '0.2' } : {} }
               >
                  <IToolTipNew tooltip='Edit' iconName='EditSettingsM' id={ `${ customItem.id }` } className='whiteTooltip' />
               </div>
               <div className='customLink__divider' />
               <div
                  className='customLink__delete'
                  title='Delete'
                  role='presentation'
                  onClick={ () => deleteCustomLink(customItem) }
               >
                  <IToolTipNew tooltip='Delete' iconName='TrashSettingsM' id={ `${ customItem.id }` } className='whiteTooltip' />
               </div>
            </div>
         )}
      </div>
   );
};

CustomLinkContentView.propTypes = {
   deleteCustomLink: PropTypes.func,
   customItem: PropTypes.object,
   customLinks: PropTypes.object,
   setCustomLinks: PropTypes.func,
   handleUpdateCustomLinkFunc: PropTypes.func,
   links: PropTypes.array,
   loading: PropTypes.bool,
   header: PropTypes.bool,
};

CustomLinkContentView.defaultProps = {

};

export default CustomLinkContentView;
