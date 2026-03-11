import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Text from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

import './index.scss';

const ActionMenu = ({
   handleShowActionMenu,
   goBack,
   handleSaveAndContinue,
   previewPlaylist,
}) => {
   const [animation, setAnimation] = useState(false);

   useEffect(() => {
      setAnimation(true);

      return () => {
         setAnimation(false);
      };
   }, []);

   const handleOutSideClick = (e) => {
      if (e.target.className === 'menu__wrapper') {
         handleShowActionMenu();
      }
   };

   const handleSave = () => {
      handleSaveAndContinue();
      goBack();
   };

   return (
      <div className='menu__wrapper' role='presentation' onClick={ handleOutSideClick }>
         <div className={ animation ? 'menu__content__wrapper active' : 'menu__content__wrapper' }>
            <div className='header__wrapper'>
               <Text 
                  inner='Playlist Actions'
               />
               <div className='icon__wrapper' role='presentation' onClick={ handleShowActionMenu }>
                  <IconNew name='CloseActionsMenu' />
               </div>
            </div>
            <div className='buttons__wrapper'>
               <div className='btn__text__wrapper' role='presentation' onClick={ previewPlaylist }>
                  <IconNew name='CheckoutActiveEyeM' />
                  <Text 
                     inner='Preview'
                  />
               </div>
               <div className='btn__text__wrapper' role='presentation' onClick={ handleSave }>
                  <IconNew name='SaveAndClose' />
                  <Text 
                     inner='Save & Close'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

ActionMenu.propTypes = {
   handleShowActionMenu: PropTypes.func,
   goBack: PropTypes.func,
   handleSaveAndContinue: PropTypes.func,
   previewPlaylist: PropTypes.func,
};

export default ActionMenu;