import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import {
   sortableContainer,
   sortableElement,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import DeleteModal from 'components/elements/DeleteModal';
import CustomLinkContentView from './CustomLinkContentView';

const SortableList = sortableElement(({
   item, openCustomLinkEditModal, setEditModalOpen, deleteCustomLink, header, editModalOpen, items,
   onInternalChange, resetState, updateCustomLink, index, customLinks, setCustomLinks,
   handleUpdateCustomLinkFunc, links, loading,
}) => {
   return (
      <CustomLinkContentView
         index={ index }
         key={ item.id }
         id={ item.id }
         customItem={ item }
         openCustomLinkEditModal={ openCustomLinkEditModal }
         setEditModalOpen={ setEditModalOpen }
         deleteCustomLink={ deleteCustomLink }
         header={ header }
         editModalOpen={ editModalOpen }
         items={ items }
         onInternalChange={ onInternalChange }
         resetState={ resetState }
         updateCustomLink={ updateCustomLink }
         customLinks={ customLinks }
         setCustomLinks={ setCustomLinks }
         handleUpdateCustomLinkFunc={ handleUpdateCustomLinkFunc }
         links={ links }
         loading={ loading }
      />
   );
});

const SortableContainer = sortableContainer(({ children }) => {
   return <>{children}</>;
});


const CustomLinks = ({
   resetState,
   onInternalChange, updateCustomLink, openCustomLinkEditModal,
   header, customLinks, setCustomLinks,
   deleteCustomLinkFunc, handleUpdateCustomLinkFunc, customLinksReorder, links,
   loading,
}) => {
   const items = customLinks?.custom_links?.items || [];

   items.sort((a, b) => {
      if (a.order < b.order) return -1;
      return a.order > b.order ? 1 : 0;
   });


   const [editModalOpen, setEditModalOpen] = useState(false);
   const [customLink, setCustomLink] = useState([]);
   const [toDeleteItem, setToDeleteItem] = useState({});


   useEffect(() => {
      const headerLinks = items.filter(child => (child.position === 'left' || child.position === 'right'));
      const footerLinks = items.filter(child => (child.position === 'f_left' || child.position === 'f_right'));
      setCustomLink(headerLinks);
      if (!header) {
         setCustomLink(footerLinks);
      }
   }, [items]);

   const onSortEnd = ({ oldIndex, newIndex }) => {
      let newData;
      if (oldIndex !== newIndex) {
         newData = arrayMove(customLink, oldIndex, newIndex);
         newData.forEach((newItem, i) => {
            const orderedData = newItem;
            orderedData.order = i;
         });
         setCustomLink(newData);
      }
      customLinksReorder(newData, 'header');
   };


   const handleDeleteCustomLinkFunc = (id, customSlug) => {
      if (id) {
         deleteCustomLinkFunc(id, () => {
            const newCustomLink = customLinks.custom_links.items.filter(link => link.id !== id);
            setCustomLinks({
               ...customLinks,
               custom_links: {
                  items: newCustomLink,
               },
            });
            setToDeleteItem({});
         });
      } else {
         const newCustomLink = customLinks.custom_links.items.filter(link => link.slug !== customSlug);
         setCustomLinks({
            ...customLinks,
            custom_links: {
               items: newCustomLink,
            },
         });
         setToDeleteItem({});
      }
   };

   return (
      <div>
         <SortableContainer onSortEnd={ onSortEnd } helperClass='sortableHelper' useDragHandle>
            <div
               className='customLinks w-full m-t-m'
               onClick={ (e) => e.stopPropagation() }
               role='presentation'
            >
               {
                  customLink.map((item, index) => {
                     return (
                        <SortableList
                           index={ index }
                           key={ item.id }
                           id={ item.id }
                           item={ item }
                           links={ links }
                           openCustomLinkEditModal={ openCustomLinkEditModal }
                           setEditModalOpen={ setEditModalOpen }
                           deleteCustomLink={ setToDeleteItem }
                           header={ header }
                           editModalOpen={ editModalOpen }
                           items={ items }
                           onInternalChange={ onInternalChange }
                           resetState={ resetState }
                           updateCustomLink={ updateCustomLink }
                           customLinks={ customLinks }
                           setCustomLinks={ setCustomLinks }
                           handleUpdateCustomLinkFunc={ handleUpdateCustomLinkFunc }
                           loading={ loading }
                        />

                     );
                  })
               }
            </div>
         </SortableContainer>
         {!!toDeleteItem && !!toDeleteItem.id && (
            <div className='m-popup'>
               <DeleteModal
                  onDelete={ () => {
                     handleDeleteCustomLinkFunc(toDeleteItem.id);
                  } }
                  maxWidth={ 414 }
                  onCancel={ () => setToDeleteItem({}) }
                  deleteText='Delete link'
                  description='This is a link to your offers page.'
                  title={ `Are you sure you want to delete  [${ toDeleteItem.text }] link?` }
               />
            </div>
         )}
      </div>
   );
};

CustomLinks.defaultProps = {
   customLinks: {},
};

CustomLinks.propTypes = {
   onInternalChange: PropTypes.func,
   updateCustomLink: PropTypes.func,
   deleteCustomLinkFunc: PropTypes.func,
   resetState: PropTypes.func,
   openCustomLinkEditModal: PropTypes.func,
   header: PropTypes.bool,
   customLinks: PropTypes.object,
   setCustomLinks: PropTypes.func,
   handleUpdateCustomLinkFunc: PropTypes.func,
   customLinksReorder: PropTypes.func,
   links: PropTypes.array,
   loading: PropTypes.bool,
};


export default CustomLinks;
