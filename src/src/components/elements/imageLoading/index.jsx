import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoaderSpinner from 'components/elements/LoaderSpiner';

const ImageLoading = ({ src, children }) => {
   const [isLoading, setIsLoading] = useState(true);
   return (
      <>
         {isLoading && (
            <LoaderSpinner />
         )}
         <img
            src={ src }
            style={ {
               objectFit: 'cover',
               width: '100%',
               maxWidth: '100%',
               display: isLoading ? 'none' : 'block',
            } }
            onLoad={ () => setIsLoading(false) }
            alt=''
         />
         {!isLoading ? children : ''}
      </>
   );
};

ImageLoading.propTypes = {
   src: PropTypes.string,
   children: PropTypes.any,
};

export default ImageLoading;
