import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import LinkEdit from 'components/elements/LinkEdit';
import LinkView from 'components/modules/LinkView';


const LinkViewWithEdit = ({
   label, copyUrl, constantUrlStart, editableLink, constantUrlEnd, onSave, isValid,
}) => {
   const [isOpenEdit, setIsOpenEdit] = useState(false);
   return (
      <div className='linkViewWithEdit'>
         {label && (
            <div className='linkViewWithEdit__label'>
               {label}
            </div>
         )}
         {isOpenEdit && (
            <LinkEdit
               editableLink={ editableLink }
               onClose={ () => setIsOpenEdit(false) }
               onSave={ onSave }
            />
         )}
         {!isOpenEdit && (
            <LinkView
               copyUrl={ copyUrl }
               linkUrl={ constantUrlStart + editableLink + constantUrlEnd }
               onEdit={ () => setIsOpenEdit(true) }
               isValid={ isValid }
            />
         )}
      </div>
   );
};


LinkViewWithEdit.propTypes = {
   label: PropTypes.string,
   copyUrl: PropTypes.string,
   constantUrlStart: PropTypes.string,
   editableLink: PropTypes.string,
   constantUrlEnd: PropTypes.string,
   onSave: PropTypes.func,
   isValid: PropTypes.bool,
};

export default LinkViewWithEdit;
