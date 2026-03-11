import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import IconNew from 'components/elements/iconsSize';

const RemoveButton = ({ inner = 'Delete', onClick, style }) => {
   return (
      <button
         type='button'
         className='delete__button__new'
         onClick={ () => onClick() }
         style={ { ...style } }
      >
         <IconNew name='DeleteCommentM' />
         {inner}
      </button>
   );
};

RemoveButton.propTypes = {
   inner: PropTypes.string,
   onClick: PropTypes.func,
   style: PropTypes.object,
};

export default RemoveButton;
