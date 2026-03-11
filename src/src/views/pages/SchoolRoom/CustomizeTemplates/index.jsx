import React from 'react';
import PropTypes from 'prop-types';
import Editor from '@monaco-editor/react';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import FilesGroupItem from './components/FilesGroupItem';

import './index.scss';

const CustomizeTemplates = ({
   localFiles,
   filesGroups,
   selectedFileKey,
   onSelectFile,
   defaultFiles,
   handleChangeEditor,
}) => {
   return (
      <div
         className='portal__customize'
      >
         <div
            className='portal__customize__left'
         >
            {
               filesGroups.map(file => (
                  <FilesGroupItem
                     key={ file.title }
                     files={ localFiles }
                     title={ file.title }
                     keys={ file.keys }
                     onSelectFile={ onSelectFile }
                     selectedFileKey={ selectedFileKey }
                  />
               ))
            }
         </div>
         <div
            className='portal__customize__right'
         >
            <Editor
               height='100%'
               width='100%'
               defaultLanguage={ selectedFileKey.includes('css') ? 'css' : 'liquid' }
               defaultValue={ defaultFiles[selectedFileKey]?.content }
               value={ localFiles[selectedFileKey].content }
               theme='vs-dark'
               language={ selectedFileKey.includes('css') ? 'css' : 'liquid' }
               onChange={ (val) => handleChangeEditor(val) }
               path={ selectedFileKey }
               loading={ (
                  <LoaderSpinner
                     width={ 300 }
                     heigth={ 300 }
                     centered={ true }
                     //  loaderStyle={ loaderStyle }
                     //  LoaderSpinnerStyle={ LoaderSpinnerStyle }
                  />
               ) }
            />
         </div>
      </div>
   );
};

CustomizeTemplates.propTypes = {
   localFiles: PropTypes.object,
   filesGroups: PropTypes.array,
   selectedFileKey: PropTypes.string,
   onSelectFile: PropTypes.func,
   defaultFiles: PropTypes.object,
   handleChangeEditor: PropTypes.func,
};

export default CustomizeTemplates;