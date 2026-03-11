import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import playlistImg from 'assets/images/playlist/playlist.png';
import playlistImgEmpty from 'assets/images/playlist/playlistEmpty.png';
import Text, { TextWithIcon, TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import moment from 'moment';
import DropTriggle from 'components/elements/newDropTriggle';
import IconNew from 'components/elements/iconsSize';
import Router from 'routes/router';
import { copyToClipBoard } from 'utils/copy';
import ChooseStatus from 'components/elements/designCourse/ChooseStatus';

const PlaylistItem = ({
   playlist, editPlaylist, deletePlaylist, handleChangeStatus, isMobile,
}) => {
   const previewPlaylist = (playlistLink) => {
      window.open(Router.route('MEMBERSHIP_PLAYLIST').getCompiledPath({ playlistLink, type: 'membership' }), '_blank');
   };

   return (
      <div className='playlistItem'>
         <div className='playlistItem__img'>
            {
               isMobile && (
                  <div className='edit__button'>
                     <DropTriggle
                        isMob={ true }
                        isPlaylist={ true }
                        isIconButton={ true }
                        options={ [
                           {
                              trash: false,
                              iconName: 'EditSettingsM',
                              name: 'Edit',
                              onClick: () => { editPlaylist(playlist.id); },
                           },
                           {
                              trash: false,
                              iconName: 'eyeGreyM',
                              name: 'Preview',
                              onClick: () => { previewPlaylist(playlist.link); },
                           },

                           {
                              trash: true,
                              iconName: 'TrashSettingsM',
                              name: 'Delete',
                              onClick: () => { deletePlaylist(playlist.id); },
                           },

                        ] }
                     />
                  </div>
               )
            }
            <img src={ playlistImg } alt='playlist' className='playlistBgImg' />
            <img src={ playlist.file?.src || playlistImgEmpty } alt='playlist' className='playlistRealImg' />
         </div>
         <div className='playlistItem__content'>
            <div className='playlistItem__content__right'>
               <Text
                  inner={ playlist.name }
                  type={ types.medium150 }
                  size={ sizes.medium }
                  className='playlistItem__content__title'
                  onClick={ () => { editPlaylist(playlist.id); } }
                  style={ { cursor: 'pointer' } }
               />
               <div className='playlistItem__content__bottom'>
                  <TextWithIcon
                     iconName='VideoQueueS'
                     inner={ playlist.blocks_count }
                     type={ types.regularDefaultSmall }
                     size={ sizes.xsmall }
                     iconGap={ 8 }
                  />
                  <div className='grey_line' />
                  <TextWithIcon
                     iconName='CalendarS'
                     inner={ moment(playlist.created_at).format('MMMM DD, YYYY') }
                     type={ types.regularDefaultSmall }
                     size={ sizes.xsmall }
                     iconGap={ 8 }
                  />
                  <div className='grey_line' />
                  <TextWithIcon
                     iconName={ playlist.is_free_lesson ? 'PlayListAccessRight' : 'PlayListAccessRightLock' }
                     inner={ playlist.is_free_lesson ? 'Free To Watch' : 'Protected' }
                     type={ types.regularDefaultSmall }
                     size={ sizes.xsmall }
                     iconGap={ 8 }
                  />
               </div>
            </div>
            <div className='playlistItem__content__left'>
               <div
                  className='playlistItem__content__left__link'
                  role='presentation'
                  onClick={ () => copyToClipBoard(`${ window.location.origin }${ Router.route('MEMBERSHIP_PLAYLIST').getCompiledPath({ playlistLink: playlist.link, type: 'membership' }) }`) }
                  style={ { cursor: 'pointer' } }
                  title='Copy Link'>
                  <IconNew name='LinkM' />
                  <div className='copy__text__wrapper'>
                     <Text
                        size={ sizes.small }
                        type={ types.regularDefault }
                        inner='Copy Link'
                     />
                  </div>
               </div>
               <div>
                  <ChooseStatus
                     isPublished={ playlist.is_published }
                     isCommunity={ true }
                     onClick={ (data) => handleChangeStatus(playlist, data) }
                  />
               </div>
               {
                  !isMobile && (
                     <div>
                        <DropTriggle
                           isMob={ true }
                           isPlaylist={ true }
                           isIconButton={ true }
                           options={ [
                              {
                                 trash: false,
                                 iconName: 'EditSettingsM',
                                 name: 'Edit',
                                 onClick: () => { editPlaylist(playlist.id); },
                              },
                              {
                                 trash: false,
                                 iconName: 'eyeGreyM',
                                 name: 'Preview',
                                 onClick: () => { previewPlaylist(playlist.link); },
                              },

                              {
                                 trash: true,
                                 iconName: 'TrashSettingsM',
                                 name: 'Delete',
                                 onClick: () => { deletePlaylist(playlist.id); },
                              },

                           ] }
                        />
                     </div>
                  )
               }
            </div>
         </div>
      </div>

   );
};

PlaylistItem.propTypes = {
   playlist: PropTypes.object,
   editPlaylist: PropTypes.func,
   deletePlaylist: PropTypes.func,
   handleChangeStatus: PropTypes.func,
   isMobile: PropTypes.bool,
};

export default PlaylistItem;
