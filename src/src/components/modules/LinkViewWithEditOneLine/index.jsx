import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LinkEdit from 'components/elements/LinkEdit';
import LinkView from 'components/modules/LinkView';

const LinkViewWithEditOneLine = ({
   label, copyUrl, constantUrlStart, editableLink, constantUrlEnd, onSave, isValid, disableEdit,
}) => {
   const [isOpenEdit, setIsOpenEdit] = useState(false);
   return (
      <div className='linkViewWithEditOnLine'>
         {label && (
            <div className='linkViewWithEditOnLine__label'>
               {label}
            </div>
         )}
         <div className='linkViewWithEditOnLine__content'>
            {isOpenEdit && (
               <LinkEdit
                  editableLink={ editableLink }
                  onClose={ () => setIsOpenEdit(false) }
                  onSave={ onSave }
                  constantUrlStart={ constantUrlStart }
               />
            )}
            {!isOpenEdit && (
               <LinkView
                  copyUrl={ copyUrl }
                  linkUrl={ constantUrlStart + editableLink + constantUrlEnd }
                  onEdit={ () => setIsOpenEdit(true) }
                  isValid={ isValid }
                  isOneLine={ true }
                  disableEdit={ disableEdit }
               />
            )}
         </div>
      </div>
   );
};


LinkViewWithEditOneLine.propTypes = {
   label: PropTypes.string,
   copyUrl: PropTypes.string,
   constantUrlStart: PropTypes.string,
   editableLink: PropTypes.string,
   constantUrlEnd: PropTypes.string,
   onSave: PropTypes.func,
   isValid: PropTypes.bool,
   disableEdit: PropTypes.bool,
};

export default LinkViewWithEditOneLine;
