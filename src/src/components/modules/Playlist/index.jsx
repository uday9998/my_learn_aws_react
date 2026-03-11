import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import playlistImg from 'assets/images/playlist/playlist.png';
import playlistImgEmpty from 'assets/images/playlist/playlistEmpty.png';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import moment from 'moment';

const Playlist = ({ playlist, isListing }) => {
   return (
      <div className='playlistMain'>
         <div className={ isListing ? 'playlist playlistSingle' : 'playlist playlistBordered' }>
            <div className='playlist__img'>
               <img src={ playlistImg } alt='playlist' className='playlistBgImg' />
               <img src={ playlist.file?.src || playlistImgEmpty } alt='playlist' className='playlistRealImg' />
               {isListing && (
                  <div className='playlist__status__wrapper__mob'>
                     <Text
                        inner='Playlist'
                        type={ types.regularDefault }
                        size={ sizes.small_14 }
                        className='playlist__status'
                        style={ { color: '#fff' } }
                     />
                  </div>
               )}
            </div>
            <div className='playlist__content'>
               <div className='playlist__content__top'>
                  <Text
                     inner={ playlist.name }
                     type={ types.regularDefault }
                     size={ sizes.small_14 }
                     className='playlist__content__title'
                  />
                  {isListing && (
                     <div className='playlist__status__wrapper'>
                        <Text
                           inner='Playlist'
                           type={ types.regularDefault }
                           size={ sizes.small_14 }
                           className='playlist__status'
                           style={ { color: '#fff' } }
                        />
                     </div>
                  )}
               </div>
               <div className={ isListing ? 'playlist__content__bottom playlist__content__bottom__listing' : 'playlist__content__bottom' }>
                  <TextWithIcon
                     iconName='VideoQueueS'
                     inner={ playlist.blocks_count }
                     iconColor='#727978'
                     type={ types.regularDefaultSmall }
                     size={ sizes.xsmall }
                     style={ { color: '#727978' } }
                     iconGap={ 8 }
                  />
                  <div className='grey_line' />
                  <TextWithIcon
                     iconName='CalendarS'
                     inner={ moment(playlist.created_at).format('MMMM DD, YYYY') }
                     iconColor='#727978'
                     type={ types.regularDefaultSmall }
                     size={ sizes.xsmall }
                     style={ { color: '#727978' } }
                     iconGap={ 8 }
                  />
               </div>
            </div>
         </div>
         {isListing && (
            <div className='playlist__content__bottom playlist__content__bottom__mob'>
               <TextWithIcon
                  iconName='VideoQueueS'
                  inner={ playlist.blocks_count }
                  iconColor='#727978'
                  type={ types.regularDefaultSmall }
                  size={ sizes.xsmall }
                  style={ { color: '#727978' } }
                  iconGap={ 8 }
               />
               <div className='grey_line' />
               <TextWithIcon
                  iconName='CalendarS'
                  inner={ moment(playlist.created_at).format('MMMM DD, YYYY') }
                  iconColor='#727978'
                  type={ types.regularDefaultSmall }
                  size={ sizes.xsmall }
                  style={ { color: '#727978' } }
                  iconGap={ 8 }
               />
            </div>
         )}
      </div>
   );
};

Playlist.propTypes = {
   playlist: PropTypes.object,
   isListing: PropTypes.bool,
};

export default Playlist;
