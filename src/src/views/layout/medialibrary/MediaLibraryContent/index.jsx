import React from 'react';
import PropTypes from 'prop-types';
import MediaItem from 'components/modules/mediaLibrary/MediaItem';
import './index.scss';
import { onDownload } from 'utils/mediaLibrary';


const MediaLibraryContent = ({
   medias, onChangeMode, mode, onEditName,
   activeTab,
}) => {
   return (
      <div className='mediaLibrary__content'>
         {medias.map(media => {
            return (
               <MediaItem
                  key={ `${ media.id }-${ media.title ? 'title' : 'name' }` }
                  id={ media.id }
                  mediaId={ `${ media.id }-${ media.title ? 'title' : 'name' }` }
                  name={ media.title ? media.title : media.name }
                  type={ activeTab }
                  mimeType={ media.type ? media.type : media.extension }
                  mode={ mode }
                  createdAt={ media.created_at }
                  onEditStart={ () => onChangeMode('edit', media.title ? {
                     title: media.title, id: media.id, src: media.src, isTitle: true,
                  } : { name: media.name, id: media.id, src: media.src }) }
                  onEditChange={ (name) => { onChangeMode('edit', media.title ? { ...mode.data, title: name } : { ...mode.data, name }); } }
                  onEditCancel={ () => onChangeMode('', { }) }
                  onEdit={ onEditName }
                  onShow={ () => onChangeMode('preview', { src: media.src, id: media.id }) }
                  canDelete={ !media.has_lesson && !media.lesson_id }
                  onDeleteStart={ () => onChangeMode('delete', { src: media.src, isTitle: !!media.title, id: media.id }) }
                  onDownload={ () => onDownload(media.src) }
               />
            );
         })}
      </div>
   );
};

MediaLibraryContent.propTypes = {
   medias: PropTypes.array,
   onChangeMode: PropTypes.func,
   onEditName: PropTypes.func,
   mode: PropTypes.object,
   activeTab: PropTypes.string,
};

export default MediaLibraryContent;
