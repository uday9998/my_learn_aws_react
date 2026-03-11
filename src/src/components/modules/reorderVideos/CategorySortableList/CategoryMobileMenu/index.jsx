import React from 'react';
import PropTypes from 'prop-types';

import Text, { SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

import './index.scss';

const CategoryMobileMenu = ({
   handleOpenMenu,
   menuInfo,
   setIsOpenDuplicate,
   handleChangeDeleteModal,
   handleSetSelectedDeleteId,
}) => {
   const handleCloseMenu = (e) => {
      if (e.target.className === 'modal__menu__wrapper' || e.target.className === 'close') {
         handleOpenMenu();
      }
   };

   const handleOpenDuplicate = () => {
      setIsOpenDuplicate(true);
   };

   const handleDelete = () => {
      if (menuInfo.allowDelete) {
         handleChangeDeleteModal();
         handleSetSelectedDeleteId(menuInfo.id, menuInfo.name);
      }
   };

   return (
      <div className='modal__menu__wrapper' role='presentation' onClick={ handleCloseMenu }>
         <div className='inner__menu__wrapper'>
            <div className='title__wrapper'>
               <Text
                  inner='Video Settings'
                  size={ sizes.small }
               />
               <div role='presentation' className='close' onClick={ handleOpenMenu }>
                  <IconNew name='CategoryVideoClose' />
               </div>
            </div>
            <div className='settings__wrapper'>
               {menuInfo.allowDuplicate && (
                  <div className='duplicate__wrapper' role='presentation' onClick={ handleOpenDuplicate }>
                     <IconNew name='CategoryVideoDuplicate' />
                     <Text
                        inner='Duplicate To Another Category'
                        size={ sizes.small14 }
                     />
                  </div>
               )}
               <div role='presentation' onClick={ handleDelete } className={ menuInfo.allowDelete ? 'delete__wrapper' : 'delete__wrapper desabled' }>
                  <IconNew name='CategoryVideoDelete' />
                  <Text
                     inner='Delete From Category'
                     size={ sizes.small14 }
                  />
               </div>
               {
                  !menuInfo.allowDelete && (
                     <div className='cannot__delete'>
                        <div className='warning__inner__wrapper'>
                           <IconNew name='CategoryVideoWarning' />
                           <Text
                              inner='Cannot Delete. Videos and Playlists must always belong to at least one category.'
                              size={ sizes.small14 }
                           />
                        </div>
                     </div>
                  )
               }
            </div>
         </div>
      </div>
   );
};

CategoryMobileMenu.propTypes = {
   handleOpenMenu: PropTypes.func,
   setIsOpenDuplicate: PropTypes.func,
   menuInfo: PropTypes.object,
   handleChangeDeleteModal: PropTypes.func,
   handleSetSelectedDeleteId: PropTypes.func,
};

export default CategoryMobileMenu;
