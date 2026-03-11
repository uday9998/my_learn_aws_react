import React, { memo } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ModalContent = ({
   position,
   children,
   bgColor,
   width,
   className,
   roundedModal,
   borderColor,
}) => {
   return (
      <div
         className={ cx({
            [`modalContent ${ className }`]: true,
            'align-center mob-modalContentCenter': position === 'center',
         }) }
      >
         <div
            id='modal-content'
            className={ cx({
               'modalContent_pos_center': position === 'center',
            }) }
            style={ {
               backgroundColor: bgColor, width, borderRadius: roundedModal && roundedModal, borderColor,
            } }
         >
            { children }
         </div>
      </div>
   );
};

ModalContent.defaultProps = {
   position: 'center',
   bgColor: 'white',
};

ModalContent.propTypes = {
   position: PropTypes.oneOf([
      'center',
      'full-screen',
   ]),
   bgColor: PropTypes.string,
   width: PropTypes.string,
   className: PropTypes.string,
   children: PropTypes.any,
   roundedModal: PropTypes.string,
   borderColor: PropTypes.string,
};

export default memo(ModalContent);
