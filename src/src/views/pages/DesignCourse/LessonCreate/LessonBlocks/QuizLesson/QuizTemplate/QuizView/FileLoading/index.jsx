import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const FileLoading = ({
   src, type, children, view, style,
}) => {
   const [isLoading, setIsLoading] = useState(false);

   return (
      <>
         {isLoading && (
            <LoaderSpinner />
         )}
         {type === 'image' && (
            <img
               src={ src }
               style={ {
                  objectFit: 'cover',
                  width: `${ style.width }px` || '100%',
                  height: `${ style.height }px` || '100%',
                  maxWidth: '100%',
                  display: isLoading ? 'none' : 'block',
               } }
               onLoad={ () => setIsLoading(false) }
               alt=''
            />
         )}
         {type !== 'image' && (view || (
            <iframe
               onLoad={ () => {
                  setIsLoading(false);
               } }
               src={ type === 'ppt' ? `https://view.officeapps.live.com/op/embed.aspx?src=${ src }&embedded=true` : src }
               frameBorder='0'
               title={ src }
               allowFullScreen
            />
         ))}
         {!isLoading ? children : ''}
      </>
   );
};

FileLoading.propTypes = {
   src: PropTypes.string,
   children: PropTypes.any,
   type: PropTypes.string,
   view: PropTypes.any,
   style: PropTypes.object,
};

export default FileLoading;
