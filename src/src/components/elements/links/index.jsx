import './index.scss';
import PropTypes from 'prop-types';
import React from 'react';

const LinkBreadCumb = ({
   text, goTo, disabled, linkColor,
}) => {
   return (
      <button style={ { color: linkColor } } type='button' className={ `${ disabled ? 'link-disabled' : 'link' }` } disabled={ disabled } onClick={ () => goTo() }>
         {text}
      </button>
   );
};

LinkBreadCumb.propTypes = {
   text: PropTypes.string,
   goTo: PropTypes.func,
   disabled: PropTypes.bool,
   linkColor: PropTypes.string,
};

export default LinkBreadCumb;
