import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useApiQuery } from 'utils/hooks/useQuery';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getLessonCategories, savePlaylist, getContentPlaylistData } from 'api/AuthApi';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import { videoAdminImg } from 'utils/videoImg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import moment from 'moment/moment';

import Text, { SIZES as sizes } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import UploadModal from 'components/modules/UploadModal';
import { toast } from 'react-toastify';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import TagsInput from './components/TagsInput';
import AddVideoModal from './components/AddVideoModal';
import ContentList from './components/ContentList';
import UploadedTrailer from './components/UploadedTrailer';

import './index.scss';

const PlaylistContent = ({
   playlistCategories,
   handleChangeplaylistCategories,
   playlistVideos,
   playlistName,
   handleChangeContentListData,
   uploadTrailer,
   handleOpenUploadModal,
   handleUploadTrailerVideo,
   handleDeleteTrailer,
   contentListData,
   handleChangeVideoData,
   allVideoData,
   handleAddVidoes,
   handleDeleteVideoData,
   handleAddCategory,
   handleCreateCategory,
   addCategory,
}) => {
   const { id, sectionId, playlistId } = useParams();
   const { data: allCategories } = useApiQuery(getLessonCategories);
   const [saveUploadedTrailer] = useSubmitForm(savePlaylist);
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [contentLoading, setContentLoading] = useState(false);
   const [isOpenDeleteTrailerModal, setIsOpenDeleteTrailerModal] = useState(false);

   const reorder = (list, startIndex, endIndex) => {
      const [removed] = list.splice(startIndex, 1);
      removed.order = endIndex;
      list.splice(endIndex, 0, removed);

      return list;
   };

   const handleGetContentVideos = async () => {
      setContentLoading(true);
      const { data } = await getContentPlaylistData(playlistId);
      data.forEach(contentData => {
         if (!contentListData.some(listData => listData.block_id === contentData.id)) {
            handleChangeContentListData({
               show_only_playlist: contentData.show_only_playlist,
               block_id: contentData.id,
               free: contentData.is_free_lesson,
            });
         }
      });
      const sortedByOrder = data.sort((a, b) => {
         if (Number(a.order) < Number(b.order)) return -1;
         return Number(a.order) > Number(b.order) ? 1 : 0;
      });

      handleAddVidoes(sortedByOrder);
      setContentLoading(false);
   };

   useEffect(() => {
      handleGetContentVideos();
   }, []);

   const handleOpenModal = () => {
      setIsOpenModal(prevState => !prevState);
   };

   const uploadVideoTrailer = (fileSrc, videoLength, name) => {
      saveUploadedTrailer({
         courseId: id,
         sectionId,
         lessonId: playlistId,
         params: {
            trailer: {
               file_src: fileSrc,
               video_length: videoLength,
               name,
            },
            is_playlist: 1,
            name: playlistName,
         },
      }, res => {
         const date = moment(res.data[0].created_at).format('DD');
         const year = moment(res.data[0].created_at).format('YYYY');
         const createdAt = `${ date }, ${ year }`;
         handleUploadTrailerVideo(videoLength, createdAt);
         toast.success(res.message);
      });
   };

   const handleOpenDeleteTrailerModal = () => {
      setIsOpenDeleteTrailerModal(prevState => !prevState);
   };

   const onDragEnd = (result) => {
      if (!result.destination) {
         toast.error("The element can't be added in this area.");
         return;
      }

      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;
      const items = reorder(allVideoData, sourceIndex, destIndex);

      const newData = items.map((item, i) => {
         const newItem = item;
         newItem.order = i;
         return (
            newItem
         );
      });
      handleAddVidoes(newData);
   };
   const grid = 0;
   const getListStyle = () => ({
      width: '100%',
      padding: grid,
   });

   const getItemStyle = (_, draggableStyle) => ({
      display: 'flex',
      flexDirection: 'column',
      ...draggableStyle,
   });

   return (
      <div className='content__wrapper'>
         {
            isOpenModal && (
               <AddVideoModal
                  playlistVideos={ playlistVideos }
                  handleOpenModal={ handleOpenModal }
                  playlistName={ playlistName }
                  handleGetContentVideos={ handleGetContentVideos }
               />
            )
         }
         {
            uploadTrailer.isOpenModal && (
               <UploadModal
                  fileLessonFormat='video'
                  isWithoutModal={ true }
                  isAmazonFile={ true }
                  text='Preview'
                  onChange={ (url, name, file) => {
                     uploadVideoTrailer(url, file.size, file.name);
                  } }
                  onCloseModal={ handleOpenUploadModal }
               />
            )
         }
         <div className='title__tagsinput__wrapper'>
            <Text
               inner='Add this Playlist to a Category'
               size={ sizes.small }
               style={ {
                  color: '#131F1E',
               } }
            />
            <TagsInput
               playlistCategories={ playlistCategories }
               allCategories={ allCategories }
               handleChangeplaylistCategories={ handleChangeplaylistCategories }
               handleAddCategory={ handleAddCategory }
               handleCreateCategory={ handleCreateCategory }
               addCategory={ addCategory }
            />
         </div>
         <div className='upload__content__wrapper'>
            <div className='title__wrapper'>
               <Text
                  inner='Content'
                  size={ sizes.small }
                  style={ {
                     color: '#131F1E',
                  } }
               />
               <div className='buttons__wrapper'>
                  {
                     !uploadTrailer.isUploadedTrailer && (
                        <BaseButton
                           isIconRight={ true }
                           onClick={ handleOpenUploadModal }
                           text='Upload Preview'
                           theme={ btnTheme.secondary }
                           iconName='PlaylistUpload'
                        />
                     )
                  }
                  <BaseButton
                     isIconRight={ true }
                     onClick={ handleOpenModal }
                     text='Add Video'
                     iconName='PlaylistAdd'
                  />
               </div>
            </div>
            {
               uploadTrailer.isUploadedTrailer && (
                  <UploadedTrailer
                     trailerPicture={ uploadTrailer.pictureSrc }
                     createdAt={ uploadTrailer.createdAt }
                     handleOpenDeleteTrailerModal={ handleOpenDeleteTrailerModal }
                     isOpenDeleteTrailerModal={ isOpenDeleteTrailerModal }
                     handleDeleteTrailer={ handleDeleteTrailer }
                  />
               )
            }
         </div>
         {
            allVideoData?.length ? (
               <DragDropContext onDragEnd={ onDragEnd }>
                  <Droppable droppableId='droppable' type='droppableItem'>
                     {(provided, snapshot) => (
                        <div className='lesson__content__wrapper' ref={ provided.innerRef } style={ getListStyle(snapshot.isDraggingOver) }>
                           {
                              allVideoData.map((content, index) => {
                                 const contentImg = videoAdminImg(content);
                                 const findedListData = contentListData.find(listData => (
                                    listData.block_id === content.id
                                 ));
                                 return (
                                    <Draggable key={ content.id } draggableId={ String(content.id) } index={ index }>
                                       {
                                          (p, s) => (
                                             <ContentList
                                                provided={ p }
                                                snapshot={ s }
                                                contentName={ content.lesson_name }
                                                contentImg={ contentImg || false }
                                                showOnlyPlaylist={ findedListData?.show_only_playlist }
                                                free={ findedListData?.free }
                                                handleChangeVideoData={ handleChangeVideoData }
                                                blockId={ content.id }
                                                playlistNames={ content.playlist_names }
                                                getItemStyle={ getItemStyle }
                                                handleDeleteVideoData={ handleDeleteVideoData }
                                                playlistId={ playlistId }
                                             />
                                          )
                                       }
                                    </Draggable>
                                 );
                              })
                           }
                           {provided.placeholder}
                        </div>
                     )}
                  </Droppable>
               </DragDropContext>
            ) : (
               <div className='added__videos__wrapper'>
                  {
                     contentLoading ? <LoaderSpinner isPlayList={ true } width={ 150 } heigth={ 150 } /> : (
                        <div className='icon__text__wrapper'>
                           <IconNew name='PlaylistMovie' />
                           <Text
                              inner="You haven't added any videos to this playlist yet"
                              size={ sizes.small_14 }
                              style={ {
                                 color: '#131F1E',
                                 fontWeight: 500,
                              } }
                           />
                        </div>
                     )
                  }
               </div>
            )
         }

      </div>
   );
};

PlaylistContent.propTypes = {
   playlistCategories: PropTypes.array,
   contentListData: PropTypes.array,
   playlistVideos: PropTypes.array,
   handleChangeplaylistCategories: PropTypes.func,
   handleChangeContentListData: PropTypes.func,
   playlistName: PropTypes.string,
   uploadTrailer: PropTypes.object,
   handleOpenUploadModal: PropTypes.func,
   handleUploadTrailerVideo: PropTypes.func,
   handleDeleteTrailer: PropTypes.func,
   handleChangeVideoData: PropTypes.func,
   handleAddVidoes: PropTypes.func,
   handleDeleteVideoData: PropTypes.func,
   allVideoData: PropTypes.array,
   handleAddCategory: PropTypes.func,
   handleCreateCategory: PropTypes.func,
   addCategory: PropTypes.array,
};

export default PlaylistContent;
