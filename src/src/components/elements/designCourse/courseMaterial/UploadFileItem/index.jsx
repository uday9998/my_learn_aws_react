import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import ProgressLine from 'components/elements/progressBar/ProgressLine';

const UploadFileItem = ({ icon, uploaded, file }) => {
   return (
      <div className='uploadFileItem'>
         <div className='uploadFileItem__left'>
            <Icon name={ icon } />
            { uploaded ? (
               <Text
                  type={ TextType.normal }
                  size={ TextSize.small }
                  inner={ file }
               />
            ) : (
               <div className='uploadedFileItem__upload'>
                  <Text
                     type={ TextType.normal }
                     size={ TextSize.small }
                     inner='Wait, we are still uploading…'
                     color='#8a94a2'
                  />
                  <div className='uploadedFileItem__progress'>
                     <ProgressLine progress='71' backColor='#c2cedb' />
                  </div>
               </div>
            )}
         </div>
         <Icon name={ uploaded ? 'Delete' : 'Close' } />
      </div>
   );
};


UploadFileItem.propTypes = {
   icon: PropTypes.string,
   file: PropTypes.string,
   uploaded: PropTypes.bool,
};

UploadFileItem.defaultProps = {
   icon: 'Multimedia',
   file: 'File',
   uploaded: false,
};
export default UploadFileItem;
