import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import PlaylistItem from 'components/modules/PlaylistItem';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import PagePagination from 'components/elements/designCourse/PagePagination';
import NotFound from 'views/pages/Offers/components/NotFound';
import PlaylistsFilter from './PlaylistsFilter';

const PlaylistLists = ({
   playlists, createPlaylist, editPlaylist, deletePlaylist, isLoading, loading, total,
   handleGetPlayListsByPages, onSearchValue,
   onSort, sort, onFilter, filter, searchValue, handleChangeStatus,
}) => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

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
      <div className='playlistLists'>
         {!loading && (
            <div className='playlistLists__header'>
               <div className='playlist__header__title__wrapper'>
                  <Text
                     inner='Playlists'
                     type={ txtTypes.mediumTitle }
                     size={ txtSizes.xlarge }
                  />
                  <a href='https://miestro.ladesk.com/300599-How-to-Create-Playlist' target='blank'>Learn More</a>
               </div>
               {
                  !isMobile && (
                     <BaseButton
                        theme={ btnTheme.primary }
                        size={ btnSizes.new_small_weight }
                        text='Add New Playlist'
                        iconName='Plus'
                        isIconRight={ true }
                        onClick={ createPlaylist }
                     />
                  )
               }
            </div>
         )}
         {!loading && (
            <PlaylistsFilter
               playlists={ playlists }
               total={ total }
               sort={ sort }
               onFilter={ onFilter }
               filter={ filter }
               onSort={ onSort }
               searchValue={ searchValue }
               onSearchValue={ onSearchValue } 
               isMobile={ isMobile }
            />
         )}
         {(!loading && !playlists.length && (!!searchValue || filter !== 'all')) && (<NotFound searchText='No results found' />)}
         {isLoading && (
            <LoaderSpinner />
         )}
         {playlists.map((playlist) => {
            return (
               <PlaylistItem
                  playlist={ playlist }
                  key={ playlist.id }
                  editPlaylist={ editPlaylist }
                  deletePlaylist={ deletePlaylist }
                  handleChangeStatus={ handleChangeStatus }
                  isMobile={ isMobile }
               />
            );
         })}
         {!loading && (
            <div className='flex justify-center m-t-exl m-b-exl p-t-exs course-pagination'>
               <PagePagination
                  isLoading={ loading }
                  changePage={ handleGetPlayListsByPages }
                  total={ total }
               />
            </div>
         )}
      </div>
   );
};

PlaylistLists.propTypes = {
   playlists: PropTypes.array,
   createPlaylist: PropTypes.func,
   editPlaylist: PropTypes.func,
   deletePlaylist: PropTypes.func,
   isLoading: PropTypes.bool,
   loading: PropTypes.bool,
   total: PropTypes.number,
   handleGetPlayListsByPages: PropTypes.func,
   sort: PropTypes.any,
   onFilter: PropTypes.func,
   onSearchValue: PropTypes.func,
   searchValue: PropTypes.string,
   onSort: PropTypes.func,
   filter: PropTypes.string,
   handleChangeStatus: PropTypes.func,
};

export default PlaylistLists;
