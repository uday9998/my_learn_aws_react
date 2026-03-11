import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/elements/inputNew';
import TextArea from 'components/elements/TextArea';
import UploadImage from 'components/modules/uploadImage';
import Switch from 'components/elements/switchNew';

import './index.scss';

const PlaylistInfo = ({
   fieldsValues,
   handleChangePlaylistFileds,
   handleChangeTextarea,
   handleChangeInstructorActive,
   isInstructor,
   errorMessages,
}) => {
   return (
      <>
         <div className='playlist__name'>
            <Input
               errorMessages={ errorMessages.name }
               value={ fieldsValues.playlistName }
               label='Playlist Name'
               onChange={ handleChangePlaylistFileds }
               name='playlistName'
               maxlength={ 30 }
               placeholder='Playlist 01'
            />
         </div>
         <div className='text__area__wrapper'>
            <TextArea
               width='100%'
               placeholderText='Enter Description'
               labelText='Playlist Description'
               color='#131F1E'
               maxLength={ 2000 }
               value={ fieldsValues.areaValue }
               onChange={ handleChangeTextarea }
               name='areaValue'
            />
         </div>
         <div className='upload__wrapper'>
            <UploadImage
               label='Playlist Thumbnail (image or video)'
               name='thumbnail_image'
               isOptional={ true }
               src={ fieldsValues.thumbnail_image }
               cropRatio='1920x1080'
               size='full'
               recomendation='for image 1920x1080'
               btnText='Thumbnail'
               onChange={ handleChangePlaylistFileds }
               fileLessonFormat='media'
               fileType={ fieldsValues.fileType }
               isImageUpload={ true }
            />
         </div>
         <div className='bottom__border' />
         <div className='instructor__section'>
            <Switch
               positionText='left'
               label='Instructor'
               value={ isInstructor }
               size='medium'
               onChange={ handleChangeInstructorActive }
            />
            <span className='instructor__footer__text'>Show instructor in playlist</span>
         </div>
      </>
   );
};

PlaylistInfo.propTypes = {
   fieldsValues: PropTypes.object,
   handleChangePlaylistFileds: PropTypes.func,
   handleChangeTextarea: PropTypes.func,
   handleChangeInstructorActive: PropTypes.func,
   isInstructor: PropTypes.bool,
   errorMessages: PropTypes.object,
};

export default PlaylistInfo;
