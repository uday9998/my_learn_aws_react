import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useOutsideClickDetector from 'utils/hooks/useOutsideClickDetector';
import { videoAdminImg } from 'utils/videoImg';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { getPlaylistVideos, savePlaylist } from 'api';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useApiQuery } from 'utils/hooks/useQuery';

import Text, { SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import CheckBox from 'components/elements/form/CheckBoxNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import Input from 'components/elements/inputNew';

import './index.scss';

const AddVideoModal = ({
   handleOpenModal,
   playlistName,
   handleGetContentVideos,
}) => {
   const { id, sectionId, playlistId } = useParams();
   const { data: playlistVideos, loading: loadingPlaylistVideos } = useApiQuery(getPlaylistVideos, [playlistId]);
   const [checkIds, setCheckedIds] = useState([]);
   const [playlistVideoData, setPlaylistVideoData] = useState([]);
   const [saveVideo, { loading }] = useSubmitForm(savePlaylist);
   const modalRef = useRef(null);
   const [searchValue, setSearchValue] = useState('');
   useOutsideClickDetector(modalRef, () => handleOpenModal());

   useEffect(() => {
      if (playlistVideos) {
         setPlaylistVideoData(playlistVideos);
      }
   }, [loadingPlaylistVideos]);

   const handleCheckVideo = (checkListVideo) => {
      setCheckedIds(prevState => {
         if (prevState.find(video => video.id === checkListVideo.id)) {
            return prevState.filter(video => checkListVideo.id !== video.id);
         } 
         return prevState.concat(checkListVideo);
      });
   };

   const handleAddVideo = () => {
      saveVideo({
         courseId: id,
         sectionId,
         lessonId: playlistId,
         params: {
            blocks: checkIds,
            is_playlist: 1,
            name: playlistName,
         },
      }, () => {
         handleGetContentVideos();
      });
      const filteredPlaylistVideoData = playlistVideoData.filter(video => {
         return !checkIds.some(checkIdsVideo => checkIdsVideo.id === video.id);
      });
      setPlaylistVideoData(filteredPlaylistVideoData);
      handleOpenModal();
   };

   const handleSelectAll = () => {
      setCheckedIds(prevState => {
         if (prevState.length) {
            return [];
         } 
         return playlistVideoData;
      });
   };

   const handleSearch = (_, value) => {
      setSearchValue(value);
   };

   useEffect(() => {
      if (playlistVideos) {
         setPlaylistVideoData(() => {
            return playlistVideos.filter(videoData => videoData.lesson_name.toLowerCase().includes(searchValue));
         });
      }
   }, [searchValue]);

   return (
      <div className='modal__wrapper'>
         {
            loading && <LoaderSpinner /> 
         }
         <div ref={ modalRef } className='modal'>
            <div className='texts__wrapper'>
               <Text 
                  inner='Add Video Video To Playlist'
                  size={ sizes.xxlarge }
               />
               <Text 
                  inner='You can add same videos to different playlist'
                  size={ sizes.small14 }
               />
               {
                  !playlistVideos?.length && (
                     <div className='search__input__wrapper'>
                        <Input
                           classI='transactions-filter-input'
                           value={ searchValue }
                           name='searchValue'
                           onChange={ handleSearch } 
                           type='search'
                           placeholder='Search'
                        />
                     </div>
                  )
               }
               
            </div>
            {loadingPlaylistVideos ? <div className='loader__wrapper'><LoaderSpinner isPlayList={ true } width={ 150 } heigth={ 150 } /></div>
               : (
                  <>
                     <div className={ playlistVideos.length ? 'videos__wrapper active' : 'videos__wrapper' }>
                        {
                           !playlistVideos.length ? (
                              <>
                                 <IconNew name='PlaylistMovie' />
                                 <Text 
                                    inner="You don't have videos yet"
                                    size={ sizes.small14 }
                                 />
                              </>
                           ) : (
                              <div className='videos'>
                                 <div className='videos__title__section'>
                                    <Text 
                                       inner={ `Videos(${ playlistVideoData.length })` }
                                       size={ sizes.small14 }
                                    />
                                    <Text 
                                       inner={ checkIds.length ? 'Deselect All' : 'Select All' }
                                       size={ sizes.small14 }
                                       style={ {
                                          color: '#24554E',
                                          cursor: 'pointer',
                                       } }
                                       onClick={ handleSelectAll }
                                    />
                                 </div>
                                 {
                                    playlistVideoData.map(video => {
                                       const videoPictureSrc = videoAdminImg(video);
                                       return (
                                          <div onClick={ () => handleCheckVideo(video) } role='presentation' key={ video.id } className='checkbox__wrapper'>
                                             <CheckBox
                                                checked={ 
                                                   checkIds.find(checkListVideo => checkListVideo.id === video.id) 
                                                }
                                                onChange={ () => handleCheckVideo(video) }
                                             /> 
                                             <div className='img__wrapper'>
                                                <div className='img__or__icon'>
                                                   {
                                                      videoPictureSrc ? <img src={ videoPictureSrc } alt='video img' /> : <IconNew name='DefaultImg' />
                                                   }
                                                </div>
                                                <Text 
                                                   inner={ video.lesson_name }
                                                   size={ sizes.small14 }
                                                />
                                             </div>
                                          </div>
                                       );
                                    })
                                 }
                              </div>
                           )
                        }
                     </div>
                     <div className='buttons__wrapper'>
                        <BaseButton
                           isIconRight={ true }
                           onClick={ handleOpenModal }
                           text='Cancel'
                           theme={ btnTheme.secondary }
                           style={ {
                              padding: '13px 38px',
                           } }
                        />
                        <BaseButton
                           isIconRight={ true }
                           onClick={ handleAddVideo }
                           text='Add Video'
                           style={ {
                              padding: '13px 38px',
                           } }
                           disabled={ !playlistVideos.length }
                        />
                     </div>
                  </>
               )}
         </div>
      </div>
   );
};

AddVideoModal.propTypes = {
   handleOpenModal: PropTypes.func,
   handleGetContentVideos: PropTypes.func,
   playlistName: PropTypes.string,
};


export default AddVideoModal;