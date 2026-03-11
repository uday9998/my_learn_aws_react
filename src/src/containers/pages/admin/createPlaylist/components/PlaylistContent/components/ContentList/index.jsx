import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { VideoListStatusVariant, colors } from 'utils/constants'; 
import { deleteBlock } from 'api';

import Text, { SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import CheckBox from 'components/elements/form/CheckBoxNew';
import CheckList from 'components/elements/checkListNew';
import DeleteModal from '../UploadedTrailer/components/DeleteModal';

import './index.scss';

const ContentList = ({
   contentImg,
   contentName,
   showOnlyPlaylist,
   free,
   handleChangeVideoData,
   blockId,
   playlistNames,
   provided,
   snapshot,
   getItemStyle,
   handleDeleteVideoData,
   playlistId,
}) => {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [names, setNames] = useState({
      displayedNames: playlistNames?.slice(0, 5),
      allNames: playlistNames.slice(5),
   });

   const handleChangeModalState = () => {
      setIsOpenModal(prevState => !prevState);
   };

   const handleDeleteVideo = async () => {
      const result = await deleteBlock(blockId, playlistId);
      handleDeleteVideoData(blockId);
   };

   let colorIndex = 0;

   return (
      <div
         className='list__wrapper'
         ref={ provided.innerRef }
         { ...provided.draggableProps }
         style={ getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
         ) }
      >
         {
            isOpenModal && (
               <DeleteModal
                  handleOpenDeleteTrailerModal={ handleChangeModalState }
                  innerText='Are you sure you want to remove the video from the playlist?'
                  handleDeleteVideo={ handleDeleteVideo }
                  isDeletePlayList={ true }
               />
            )
         }
         <div className='top__section'>
            <div className='img__drag__wrapper'>
               <div className='drag__element'>
                  <span
                     className='dragHandleIcon'
                     { ...provided.dragHandleProps }
                  >
                     <IconNew name='PlaylistDrag' />
                  </span>
                  {
                     contentImg ? <img src={ contentImg } alt='video img' /> : <IconNew name='DefaultImg' />
                  }
                  <div className='mobile__title__wrapper'>
                     <Text 
                        inner={ contentName }
                        size={ sizes.small }
                     />
                  </div>
               </div>
               <div className='title__wrapper'>
                  <div className='title__inner__wrapper'>
                     <Text 
                        inner={ contentName }
                        size={ sizes.small }
                     />
                  </div>
                  <div className='names__texts__wraper'>
                     {
                        showOnlyPlaylist === 1 && (
                           <div className='icon__text__wrapper'>
                              <IconNew name='PlaylistSubtitleMovie' />
                              <Text 
                                 inner='Video is already on playlist(s)'
                                 size={ sizes.small14 }
                              />
                           </div>
                        )
                     }
                     {
                        showOnlyPlaylist === 1 && (
                           <div className='tags__wrapper'>
                              <div className='categories__tag__wrapper'>
                                 {
                                    names.displayedNames.map((name, index) => {
                                       return (
                                          <div
                                             key={ index }
                                             className='tag'
                                             style={ {
                                                background: colors[index].backgroundColor,
                                                color: colors[index].textColor,
                                             } }>
                                             <span>{name}</span>
                                          </div>
                                       );
                                    })
                                 }
                                 {
                                    names.allNames.length ? (
                                       <div className='count__and__names__wrapper'>
                                          <span id='names__count'>
                                             + {names.allNames.length}
                                             <div className='names__wrapper'>
                                                <div className='names__inner__wrapper'>
                                                   {
                                                      names.allNames.map((name, index) => {
                                                         colorIndex++;

                                                         if (colorIndex === 5) {
                                                            colorIndex = 0;
                                                         } 

                                                         return (
                                                            <div
                                                               key={ index }
                                                               className='tag'
                                                               style={ {
                                                                  background: colors[colorIndex].backgroundColor,
                                                                  color: colors[colorIndex].textColor,
                                                               } }>
                                                               <span>{name}</span>
                                                            </div>
                                                         );
                                                      })
                                                   }
                                                </div>
                                             </div>
                                          </span>
                                    
                                       </div>
                                    ) : null
                                 }
                              </div>
                           </div>
                        )
                     }
                  </div>
               </div>
            </div>
            
            <div className='delete__button' role='presentation' onClick={ handleChangeModalState }>
               <IconNew name='PlaylistDelete' />
            </div>
         </div>
         <div className='make__this__video__section'>
            <div onClick={ () => handleChangeVideoData(false, blockId) } role='presentation' className='checkbox__wrapper'>
               <CheckBox
                  checked={ !!free }
                  onChange={ () => handleChangeVideoData(false, blockId) }
               /> 
               <Text 
                  inner='Make this video free to preview'
                  size={ sizes.small14 }
               />
            </div>
            {
               free ? <IconNew name='PlayListAccessRight' /> : null
            }
         </div>
         <div className='show__section' role='presentation'>
            <CheckList
               items={ VideoListStatusVariant }
               values={ [showOnlyPlaylist] }
               onChange={ () => handleChangeVideoData(true, blockId) }
            />
            <div className='info__text__wrapper'>
               <div className='text_icon_wrapper'>
                  <IconNew name='PlayListExclamatory' />
                  <span>{showOnlyPlaylist === 1 ? 'The user can find this video in this playlist' : 'This video will also be seen as an individual'}</span>
               </div>
            </div>
         </div>
      </div>
   );
};

ContentList.propTypes = {
   contentImg: PropTypes.string,
   contentName: PropTypes.string,
   showOnlyPlaylist: PropTypes.number,
   blockId: PropTypes.number,
   free: PropTypes.any,
   handleChangeVideoData: PropTypes.func,
   handleDeleteVideoData: PropTypes.func,
   getItemStyle: PropTypes.func,
   playlistNames: PropTypes.array,
   provided: PropTypes.object,
   snapshot: PropTypes.object,
   playlistId: PropTypes.string,
};

export default ContentList;