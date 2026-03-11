import React from 'react';
import PropTypes from 'prop-types';
import UploadImage from 'components/modules/uploadImage';
import Select from 'components/elements/SelectNew';

const NotFoundTemplateEditor = ({ handleChangeProp, generalProps }) => {
   const typeVariants = [
      { value: 'green', label: 'Type Green' },
      { value: 'white', label: 'Type White' },
      { value: 'red', label: 'Type Red' },
      { value: 'black', label: 'Type Black' },
      { value: 'blue', label: 'Type Blue' },
   ];
   return (
      <>
         <Select
            value={ generalProps.type }
            options={ typeVariants }
            onChange={ handleChangeProp }
            name='type'
            type='select-medium'
            label='Select Template Type'
         />
         <UploadImage
            // isPageBuilder={ true }
            label='Your Logo'
            src={ generalProps.logo }
            onChange={ (e, url) => handleChangeProp('logo', url) }
            name='logo'
            recomenededText='Recommended size'
            recomendation='400x400'
            isImageUpload={ true }
         />
      </>
   );
};

NotFoundTemplateEditor.propTypes = {
   handleChangeProp: PropTypes.func,
   generalProps: PropTypes.object,
};

export default NotFoundTemplateEditor;
