import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import {
   videoIcon, imageIcon, audioIcon, applicationIcon,
} from 'components/modules/PostEditor/PostEditorHtmls/svgs';

const FileMessageView = ({ url, name, type }) => {
   const getFileSvg = () => {
      let icon = null;
      
      if (type.includes('video')) {
         icon = videoIcon(type.split('/')[1]);
      }
      if (type.includes('png') || url.includes('png')) {
         icon = imageIcon(type.split('/')[1] ? type.split('/')[1] : 'png');
      }
      if (type.includes('audio')) {
         icon = audioIcon(type.split('/')[1]);
      }
      if (type.includes('application')) {
         icon = applicationIcon(name.split('.').at(-1));
      }
      if (url.includes('pdf')) {
         icon = applicationIcon('pdf');
      }
      if (!icon) {
         icon = videoIcon(type.split('/')[1]);
      }
      return icon;
   };
   return (
      <div className='file__message' onClick={ () => window.open(url, '_blank') } role='presentation'>
         <div className='file__message__icon' dangerouslySetInnerHTML={ { __html: getFileSvg() } } />
         <Text
            inner={ name }
            type={ types.regularDefault }
            size={ sizes.small }
         />
      </div>
   );
};

FileMessageView.propTypes = {
   url: PropTypes.string,
   name: PropTypes.string,
   type: PropTypes.string,
};

export default FileMessageView;
