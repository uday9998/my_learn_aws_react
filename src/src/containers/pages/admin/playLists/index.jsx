import React, { useEffect, useState } from 'react';
import Router from 'routes/router';

import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useApiQuery } from 'utils/hooks/useQuery';
import {
   getPlayLists, createPlaylistLesson, deletePlaylist, changePlaylistStatus,
} from 'api';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';

import HeaderTypeFirst from 'components/elements/HeaderTypes/HeadereTypeFirst';
import BaseButton, { SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import Text, { SIZES as sizes } from 'components/elements/TextNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import PlaylistLists from 'views/pages/PlaylistLists';
import DeleteModal from 'components/elements/DeleteModal';
import Input from 'components/elements/inputNew';

import './index.scss';

const PlayLists = () => {
   const history = useHistory();
   const { id, sectionId } = useParams();
   const { data: playListsData, setData: setPlaylistData, loading } = useApiQuery(getPlayLists, [{ params: { sort: 'newest' } }]);
   const [createNewPlayListLesson, { loading: createLoading }] = useSubmitForm(createPlaylistLesson);
   const [getPlayListsByPages, { loading: loadingPlaylists }] = useSubmitForm(getPlayLists);
   const [handleDeletePlaylist, { loading: deletePlaylistLoading }] = useSubmitForm(deletePlaylist);
   const [changeStatus, { loading: changeStatusLoading }] = useSubmitForm(changePlaylistStatus);
   const [deletePlaylistModalOpen, setDeletePlaylistModalOpen] = useState(false);
   const [isOpenSearch, setIsOpenSearch] = useState(false);
   const [pageNumber, setPageNumber] = useState(1);
   const [playlistIdDelete, setPlaylistIdDelete] = useState(0);
   const [searchValue, setSearchValue] = useState('');
   const [filter, setFilter] = useState('all');
   const [sort, setSort] = useState('newest');
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
   const currentParams = {
      searchValue,
      sort,
      filter,
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

   const goBack = () => {
      history.goBack();
   };

   const createLesson = () => {
      createNewPlayListLesson({ id, sectionId, body: { name: 'Playlist Video', is_playlist: 1 } }, res => {
         history.push(Router.route('ADMIN_PLAYLIST').getCompiledPath({
            id, sectionId, playlistId: res.id,
         }));
      });
   };

   const editPlaylist = (playlistId) => {
      history.push(Router.route('ADMIN_PLAYLIST').getCompiledPath({
         id, sectionId, playlistId,
      }));
   };

   const handleGetPlayListsByPages = (pageNum) => {
      setPageNumber(pageNum.currentPage);
      getPlayListsByPages({ pageNum: pageNum.currentPage, params: { sort: 'newest' } }, (res) => {
         setPlaylistData(res);
         setSort('newest');
         setSearchValue('');
         setFilter('all');
      });
   };

   const handleGetPlayListsByPagesNew = (pageNumber, params) => {
      getPlayListsByPages({ pageNum: pageNumber, params }, (res) => {
         setPlaylistData(res);
      });
   };

   const onSort = (value) => {
      setSort(value);
      handleGetPlayListsByPagesNew(pageNumber, { ...currentParams, sort: value });
   };

   const deleteCurrentPlaylist = (playlistId) => {
      setPlaylistIdDelete(playlistId);
      setDeletePlaylistModalOpen(!deletePlaylistModalOpen);
   };

   const deletePlaylistApproved = () => {
      handleDeletePlaylist({ courseId: id, sectionId, playlistId: playlistIdDelete }, () => {
         if (playListsData.data.length === 1) {
            handleGetPlayListsByPagesNew(1);
         } else {
            handleGetPlayListsByPagesNew(pageNumber);
         }
         setDeletePlaylistModalOpen(!deletePlaylistModalOpen);
         setPlaylistIdDelete(0);
         onSort(sort);
      });
   };

   const deletePlaylistCancelled = () => {
      setDeletePlaylistModalOpen(!deletePlaylistModalOpen);
      setPlaylistIdDelete(0);
   };

   const onFilter = (value) => {
      setFilter(value);
      handleGetPlayListsByPagesNew(pageNumber, { ...currentParams, filter: value });
   };

   const onSearchValue = (value) => {
      setSearchValue(value);
      handleGetPlayListsByPagesNew(pageNumber, { ...currentParams, searchValue: value });
   };

   const handleChangeStatus = (playlist, data) => {
      changeStatus({
         courseId: id, sectionId, playlistId: playlist.id, params: { is_published: !data ? '1' : '0', name: playlist.name },
      }, () => {
         const playlistNewData = playListsData.data.map(value => {
            const newValue = value;
            if (value.id === playlist.id) {
               newValue.is_published = !data ? '1' : '0';
            }
            return (
               newValue
            );
         });

         setPlaylistData({
            ...playListsData,
            data: playlistNewData,
         });
      });
   };

   const handleChangeShowSearch = () => {
      setIsOpenSearch(prevState => !prevState);
   };

   return (
      <div className='playlists__wrapper'>
         <HeaderTypeFirst
            goBack={ goBack }
            title='Back'
            isFirstPage={ true }
            createPlaylist={ createLesson }
            isMobile={ isMobile }
            handleChangeShowSearch={ handleChangeShowSearch }
            isOpenSearch={ isOpenSearch }
         />
         {
            isOpenSearch && isMobile && (
               <div className='search__input__wrapper'>
                  <Input
                     value={ searchValue }
                     type='search'
                     name='searchField'
                     placeholder='Search'
                     onChange={ (name, value) => onSearchValue(value) }
                  />
               </div>
            )
         }
         {
            createLoading && (
               <LoaderSpinner
               />
            )
         }
         <div className='content__wrapper'>
            <div className={ loading ? 'content__inner__wrapper content__loading' : 'content__inner__wrapper' }>
               {loading && (
                  <LoaderSpinner
                     isPlayList={ true }
                  />
               ) }
               {!(!loading && !loadingPlaylists && !playListsData.data?.length && !searchValue && filter === 'all') && (

                  <PlaylistLists
                     playlists={ playListsData?.data || [] }
                     total={ playListsData?.total || 0 }
                     createPlaylist={ createLesson }
                     editPlaylist={ editPlaylist }
                     deletePlaylist={ deleteCurrentPlaylist }
                     isLoading={ loadingPlaylists || deletePlaylistLoading || changeStatusLoading }
                     loading={ loading }
                     handleGetPlayListsByPages={ handleGetPlayListsByPages }
                     sort={ sort }
                     onSort={ onSort }
                     filter={ filter }
                     onFilter={ onFilter }
                     searchValue={ searchValue }
                     onSearchValue={ onSearchValue }
                     handleChangeStatus={ handleChangeStatus }
                  />
               )}

               {!loading && !loadingPlaylists && !playListsData.data?.length && !searchValue && filter === 'all' && (
                  <>
                     <div className='title'>
                        <Text
                           inner='Playlists'
                           size={ sizes.xlarge_new }
                           style={ {
                              fontWeight: '500',
                           } }
                        />
                     </div>
                     <div className='center__block'>
                        <IconNew name='PlayList' />
                        <div className='texts__wrapper'>
                           <Text
                              inner="You don't have video playlists yet"
                              size={ sizes.small_14 }
                              style={ {
                                 color: '#131F1E',
                              } }
                           />
                           <Text
                              inner="Let's start creating your first video playlist."
                              size={ sizes.new_size_28 }
                              style={ {
                                 color: '#131F1E',
                              } }
                           />
                        </div>
                        <BaseButton
                           text='Create Playlist'
                           size={ btnSizes.new_small_weight }
                           onClick={ createLesson }
                        />
                     </div>
                  </>
               )}

            </div>
         </div>
         {
            deletePlaylistModalOpen && (
               <DeleteModal
                  title='Are you sure you want to delete this playlist?'
                  deleteText='Delete'
                  maxWidth={ 345 }
                  onDelete={ deletePlaylistApproved }
                  onCancel={ deletePlaylistCancelled }
               />
            )
         }
      </div>
   );
};

export default PlayLists;
