import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';

import Text, { SIZES as sizes } from 'components/elements/TextNew';
import Button, { SIZES as btnSizes, THEMES as themes } from 'components/elements/buttons/BaseButtonNew';

import './index.scss';

const DeleteModal = ({
   deletePlaylistTrailer,
   handleOpenDeleteTrailerModal,
   innerText,
   isDeletePlayList,
   handleDeleteVideo,
}) => {
   const modalRef = useRef(null);

   useOutsideClickDetector(modalRef, handleOpenDeleteTrailerModal);

   const handleDelete = () => {
      if (!isDeletePlayList) {
         deletePlaylistTrailer();
      } else {
         handleDeleteVideo();
      }

      handleOpenDeleteTrailerModal();
   };

   return (
      <div className='modal__wrapper'>
         <div ref={ modalRef } className='modal__content__wrapper'>
            <Text 
               inner={ innerText }
               size={ sizes.large_new }
            />
            <div className='buttons__wrapper'>
               <Button
                  text='No'
                  size={ btnSizes.large }
                  onClick={ handleOpenDeleteTrailerModal }
                  theme={ themes.secondary }
               />
               <Button
                  text='Yes'
                  size={ btnSizes.large }
                  onClick={ handleDelete }
               />
                           
            </div>
         </div>
      </div>
   );
};

DeleteModal.propTypes = {
   deletePlaylistTrailer: PropTypes.func,
   handleOpenDeleteTrailerModal: PropTypes.func,
   handleDeleteVideo: PropTypes.func,
   innerText: PropTypes.string,
   isDeletePlayList: PropTypes.bool,
};

export default DeleteModal;