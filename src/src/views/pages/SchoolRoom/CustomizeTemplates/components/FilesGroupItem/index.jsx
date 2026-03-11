import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const FilesGroupItem = ({
   title,
   keys,
   files,
   onSelectFile,
   selectedFileKey,
}) => {
   return (
      <div
         className='files__group__item'
      >
         <span
            className='files__group__item__title'
         >
            { title }
         </span>
         <div
            className='files__group__item__files'
         >
            {
               keys.map(key => {
                  return (
                     <div
                        key={ key }
                        className={ `files__group__item__files__item ${ key === selectedFileKey ? 'active' : '' }` }
                        role='presentation'
                        onClick={ () => onSelectFile(key) }
                     >
                        <span>{files[key].file_name}</span>
                     </div>
                  );
               })
            }
         </div>
      </div>
   );
};

FilesGroupItem.propTypes = {
   title: PropTypes.string,
   keys: PropTypes.array,
   files: PropTypes.array,
   onSelectFile: PropTypes.func,
   selectedFileKey: PropTypes.string,
};

export default FilesGroupItem;