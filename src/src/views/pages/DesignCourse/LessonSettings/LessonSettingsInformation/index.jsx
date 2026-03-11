import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import UploadMediaImageView from 'components/elements/UploadMediaViews/UploadMediaImageVIew';

const LessonSettingsInformation = ({ inputs, onChange, course }) => {
   return (
      <div className='lesson__settings__information'>
         <div className='lesson__settings__information__top'>
            <Text
               inner={ course.type === '1' ? 'Video Information' : 'Lesson Information' }
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
         </div>
         <div className='lesson__settings__information__inputs'>
            <Input
               name='name'
               value={ inputs.name }
               label={ course.type === '1' ? 'Video Name' : 'Lesson Name' }
               onChange={ onChange }
            />
            <Input
               type='textarea'
               name='subtitle'
               value={ inputs.subtitle }
               label='Subtitle / Description'
               onChange={ onChange }
               placeholder={ course.type === '1' ? 'A short description of the video' : 'A short description of the lesson' }
            />
         </div>
         {/* <div className='lesson__settings__information__instructor'>
            <Text
               inner='Instructor'
               type={ types.regularDefault }
               size={ sizes.small }
            />
            <div className='lesson__settings__information__instructor__bottom'>
               <img src={ author.picture_src || author.picture_full_src } alt='' />
               <Text
                  inner={ author.name }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
            </div>
         </div> */}
         { course.type !== '1' && (
            <div className='lesson__settings__upload'>
               <Text
                  inner={ course.type === '1' ? 'Video Cover' : 'Lesson Cover' }
                  type={ types.regularDefault }
                  size={ sizes.small }
               />
               <UploadMediaImageView
                  src={ inputs.picture_src ? inputs.picture_src : (inputs.file && inputs.file.src) }
                  type='image'
                  buttonText='Image'
                  iconName='ClearImageM'
                  isRemove={ true }
                  uploadProps={ {
                     fileLessonFormat: 'image',
                     isAmazonFile: true,
                     cropRatio: '1920x1080',
                     onChange: (value, originalName, file) => onChange('picture_src', value, '', file),
                  } }
               />
            </div>
         )}
      </div>
   );
};

LessonSettingsInformation.propTypes = {
   inputs: PropTypes.object,
   onChange: PropTypes.func,
   course: PropTypes.object,
};

export default LessonSettingsInformation;
