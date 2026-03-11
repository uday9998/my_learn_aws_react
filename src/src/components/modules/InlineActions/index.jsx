import React from 'react';
import PropTypes from 'prop-types';
import DragImg from 'assets/images/pageBuilder/drag.png';
import './index.scss';
import IconNew from 'components/elements/iconsSize';

const InlineActions = ({
   handleDuplicateComponent, handleDeleteComponent, sectionIndex, index,
}) => {
   return (
      <div className='actionButtons'>
         <div className='dragButton'>
            <img
               alt='drag&drop'
               src={ DragImg }
            />
         </div>
         <div
            className='duplicateButton'
            onClick={ () => handleDuplicateComponent(index, sectionIndex) }
            role='presentation'
         >
            <IconNew name='CopyActionM' />
         </div>
         <div
            className='deleteButton'
            role='presentation'
            onClick={ () => handleDeleteComponent(index, sectionIndex) }
         >
            <IconNew name='DeleteMediaM' />
         </div>
      </div>
   );
};

InlineActions.propTypes = {
   handleDeleteComponent: PropTypes.func,
   handleDuplicateComponent: PropTypes.func,
   sectionIndex: PropTypes.number,
   index: PropTypes.number,
};


export default InlineActions;
