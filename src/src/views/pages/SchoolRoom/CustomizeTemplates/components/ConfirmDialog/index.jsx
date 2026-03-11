import React from 'react';
import PropTypes from 'prop-types';
import ApproveModal from 'components/elements/ApproveModal';

const ConfirmDialog = ({
   onApprove,
   onCancel,
   type,
}) => {
   const contentByTypes = {
      'exit': {
         title: 'Are you sure you want to exit? Your changes will be lost.',
         btnText: 'Save & Exit',
         cancelText: 'Exit Without Saving',
      },
      'change_folder': {
         title: 'Are you sure you want to change file? Your changes will be lost.',
         btnText: 'Save & Change',
         cancelText: 'Change Without Saving',
      },
   };

   return (
      <ApproveModal
         title={ contentByTypes[type].title }
         btnText={ contentByTypes[type].btnText }
         cancelText={ contentByTypes[type].cancelText }
         onApprove={ onApprove }
         onCancel={ onCancel }
         dontCancelOnClickOutside
         onClickOutside={ onCancel }
      />
   );
};

ConfirmDialog.propTypes = {
   onApprove: PropTypes.func,
   onCancel: PropTypes.func,
   type: PropTypes.string,
};

export default ConfirmDialog;