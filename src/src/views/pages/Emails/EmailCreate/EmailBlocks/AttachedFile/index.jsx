import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';

const ImageLesson = ({
   block,
}) => {
   const defaultBlocks = {
      'application/audio': {
         name: 'Audio',
         icon: 'audioM',
         value: 'application/audio',
      },
      'application/pdf': {
         name: 'PDF',
         icon: 'pdfM',
         value: 'application/pdf',
      },
      'application/ppt': {
         name: 'PowerPoint',
         icon: 'PptM',
         value: 'application/ppt',
      },
      'Multimedia': {
         name: 'Multimedia',
         icon: 'multimediaM',
         value: 'Multimedia',
      },
      'image/png': {
         name: 'Image',
         icon: 'ImageM',
         value: 'image/png',
      },
   };
   return (
      <div className='attached_files_email'>
        Attached Files
         <div>
            {block.email_files && !!block.email_files.length && block.email_files.map((link, i) => {
               const newIndex = i + 1;
               return (
                  <div key={ newIndex }>
                     <IconNew name='multimediaM' />
                  </div>
               );
            })
            }
         </div>
      </div>
   );
};

ImageLesson.propTypes = {
   block: PropTypes.object,
};

export default ImageLesson;
