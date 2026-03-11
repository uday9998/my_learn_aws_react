import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deleteTrailer } from 'api';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import IconNew from 'components/elements/iconsSize';
import Text, { SIZES as sizes } from 'components/elements/TextNew';
import DeleteModal from './components/DeleteModal';

import './index.scss';

const UploadedTrailer = ({
   createdAt,
   isOpenDeleteTrailerModal,
   handleOpenDeleteTrailerModal,
   trailerPicture,
   handleDeleteTrailer,
}) => {
   const { id, sectionId, playlistId } = useParams();
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
   const deletePlaylistTrailer = async () => {
      await deleteTrailer(id, sectionId, playlistId);
      handleDeleteTrailer();
   };

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 1024);
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <div className='uploaded__trailer__wrapper'>
         {
            isOpenDeleteTrailerModal && (
               <DeleteModal
                  deletePlaylistTrailer={ deletePlaylistTrailer }
                  handleOpenDeleteTrailerModal={ handleOpenDeleteTrailerModal }
                  handleDeleteTrailer={ handleDeleteTrailer }
                  innerText='Are you sure you want to delete the preview?'
               />
            )
         }
         {
            !isMobile ? (
               <div className='left__section'>
                  <div className='pin__and__img__wrapper'>
                     <IconNew name='PlaylistPin' />
                     {
                        trailerPicture ? <img src={ trailerPicture } alt='trailer' /> : <IconNew name='DefaultImg' />
                     }
                  </div>
                  <span className='trailer__text__wrapper'>Preview</span>
                  <div className='year__wrapper'>
                     <IconNew name='PlaylistCalendar' />
                     <Text 
                        inner={ `April ${ createdAt }` }
                        size={ sizes.small14 }
                     />
                  </div>
               </div>
            ) : (
               <div className='left__section'>
                  <div className='mobile__icons__wrapper'>
                     <IconNew name='PlaylistPin' />
                     <span className='trailer__text__wrapper'>Preview</span>
                  </div>
                  <div className='pin__and__img__wrapper mobile'>
                     
                     {
                        trailerPicture ? <img src={ trailerPicture } alt='trailer' /> : <IconNew name='DefaultImg' />
                     }
                  </div>
                  <div className='year__wrapper'>
                     <IconNew name='PlaylistCalendar' />
                     <Text 
                        inner={ `April ${ createdAt }` }
                        size={ sizes.small14 }
                     />
                  </div>
               </div>
            )
         }
         
         <div className='right__section' role='presentation' onClick={ handleOpenDeleteTrailerModal }>
            <IconNew name='PlaylistDelete' />
         </div>
      </div>
   );
};

UploadedTrailer.propTypes = {
   createdAt: PropTypes.string,
   trailerPicture: PropTypes.string,
   isOpenDeleteTrailerModal: PropTypes.bool,
   handleOpenDeleteTrailerModal: PropTypes.func,
   handleDeleteTrailer: PropTypes.func,
};

export default UploadedTrailer;