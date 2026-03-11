import React from 'react';
import PropTypes from 'prop-types';

import CheckList from 'components/elements/checkListNew';
import Text, { SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import StatusCheckList from 'components/modules/designCourse/StatusCheckList';

import './index.scss';

const PlaylistStatus = ({
   instructorData,
   handleChangeStatus,
   statusVariants,
   playlistAccess,
   handleChangePlaylistStatus,
   isMobile,
   showSettings,
   handleShowSettings,
}) => {
   return (
      <div className='checklists__wrapper'>
         <div className={ showSettings && isMobile ? 'checklists__inner__wrapper active' : 'checklists__inner__wrapper' }>
            <div className='status__wrapper'>
               <Text
                  inner='Playlist Status'
                  size={ sizes.large_new }
               />
               <StatusCheckList
                  status={ instructorData.status }
                  onChangeStatus={ (val, date) => handleChangeStatus(val, date) }
                  isPlaylist={ true }
               />
            </div>
            <div className='playlist__access'>
               <div className='title__wrapper'>
                  <Text
                     inner='Playlist Access'
                     size={ sizes.large_new }
                     style={ {
                        color: '#131F1E',
                     } }
                  />
               </div>
               <CheckList
                  items={ statusVariants }
                  values={ playlistAccess }
                  onChange={ handleChangePlaylistStatus }
               />
            </div>
         </div>
         {
            isMobile && (
               <div role='presentation' className='show__button__wrapper' onClick={ handleShowSettings }>
                  <span>
                     {
                        showSettings ? 'Hide Playlist Settings' : 'Show Playlist Settings'
                     }
                     <IconNew name={ showSettings ? 'PlaylistSettingsHide' : 'PlaylistSettingsShow' } /> 
                  </span>
               </div>
            )
         }
      </div>
   );
};

PlaylistStatus.propTypes = {
   instructorData: PropTypes.object,
   handleChangeStatus: PropTypes.func,
   statusVariants: PropTypes.array,
   playlistAccess: PropTypes.string,
   handleChangePlaylistStatus: PropTypes.func,
   handleShowSettings: PropTypes.func,
   isMobile: PropTypes.bool,
   showSettings: PropTypes.bool,
};

export default PlaylistStatus;