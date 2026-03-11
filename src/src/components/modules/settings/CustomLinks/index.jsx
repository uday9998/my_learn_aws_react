import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import BaseButton, { THEMES as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import { slug } from 'views/pages/DesignCourse/LessonCreate/BlockComponent';
import AddCustomLinkContent from './AddCustomLinkContent';


const CustomLinks = ({
   resetState,
   onInternalChange, updateCustomLink, openCustomLinkEditModal,
   header, customLinks, setCustomLinks,
   handleCreateCustomLink, links, loading,
}) => {
   const items = customLinks?.custom_links?.items || [];

   const [editModalOpen, setEditModalOpen] = useState(false);
   const [addItem, setAddItem] = useState(false);
   const [customLink, setCustomLink] = useState([]);

   const count = 5;

   useEffect(() => {
      const headerLinks = items.filter(child => (child.position === 'left' || child.position === 'right'));
      const footerLinks = items.filter(child => (child.position === 'f_left' || child.position === 'f_right'));
      setCustomLink(headerLinks);
      if (!header) {
         setCustomLink(footerLinks);
      }
   }, [items]);


   const addNewCustomLink = (isHeader) => {
      setAddItem(true);
      const newCustomLink = {
         text: '',
         href: '',
         position: 'right',
         target: '_blank',
         color: '',
         slug: slug(),
         order: items.length,
      };
      if (!isHeader) {
         newCustomLink.position = 'f_right';
         // newCustomLink.color = '#fff';
      }
      setCustomLink(newCustomLink);
   };

   const resetCustomLink = () => {
      if (setAddItem) {
         setAddItem(false);
      }
   };


   return (
      <div>
         <div
            className='customLinks w-full m-t-m'
            onClick={ (e) => e.stopPropagation() }
            role='presentation'
         >
            {addItem && (
               <AddCustomLinkContent
                  customItem={ customLink }
                  openCustomLinkEditModal={ openCustomLinkEditModal }
                  setEditModalOpen={ setEditModalOpen }
                  header={ header }
                  editModalOpen={ editModalOpen }
                  resetCustomLink={ resetCustomLink }
                  items={ items }
                  onInternalChange={ onInternalChange }
                  resetState={ resetState }
                  updateCustomLink={ updateCustomLink }
                  customLinks={ customLinks }
                  setCustomLinks={ setCustomLinks }
                  links={ links }
                  setAddItem={ setAddItem }
                  handleCreateCustomLink={ handleCreateCustomLink }
                  loading={ loading }
               />
            )}
            <div className='customLinks__create'>
               {!addItem && links.length < count && (
                  <BaseButton
                     theme={ btnTheme.tertiaryGreen }
                     size={ btnSize.full }
                     isIconRight={ true }
                     text='Add Item'
                     iconName='Plus'
                     onClick={ () => addNewCustomLink(header) }
                  />
               )}

            </div>

         </div>
      </div>
   );
};

CustomLinks.defaultProps = {
   customLinks: {},
};

CustomLinks.propTypes = {
   onInternalChange: PropTypes.func,
   updateCustomLink: PropTypes.func,
   resetState: PropTypes.func,
   openCustomLinkEditModal: PropTypes.func,
   header: PropTypes.bool,
   customLinks: PropTypes.object,
   setCustomLinks: PropTypes.func,
   handleCreateCustomLink: PropTypes.func,
   links: PropTypes.array,
   loading: PropTypes.bool,
};


export default CustomLinks;
