import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Button from 'components/elements/buttons/BaseButtonNew';
import { Popover } from '@material-ui/core';

const DropButton = ({ buttonProps, children, isArrowIcon }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const onClickButton = (e) => {
      setIsOpen(true);
      setAnchorEl(e.currentTarget);
   };
   const onClose = () => {
      setIsOpen(false);
   };

   return (
      <div className='drop___new'>
         <Button
            { ...buttonProps }
            isDropButton={ true }
            onClick={ onClickButton }
            isRotatedIcon={ !!((isArrowIcon && isOpen)) }
         />
         <Popover
            open={ isOpen }
            anchorEl={ anchorEl }
            onClose={ onClose }
            className='custom-popover'
            elevation={ 24 }
            anchorOrigin={ {
               vertical: 'bottom',
               horizontal: 'center',
            } }
            transformOrigin={ {
               vertical: 'top',
               horizontal: 'center',
            } }
         >
            <div className='drop__new__content'>
               {children}
            </div>
         </Popover>
      </div>
   );
};

DropButton.propTypes = {
   buttonProps: PropTypes.object,
   isArrowIcon: PropTypes.bool,
   children: PropTypes.any,
};

export default DropButton;
