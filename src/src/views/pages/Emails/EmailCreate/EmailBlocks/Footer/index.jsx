import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const Footer = ({
   onFooterChange, siteInfo, email,
}) => {
   return (
      <div className='footer__email'
         //  style={ (block.css_attributes && block.css_attributes.letterSpacing) ? { letterSpacing: `${ block.css_attributes.letterSpacing }px` } : {} }
      >
         <input
            // value={ (block.css_attributes && block.css_attributes.description) || `Copyright © ${ new Date().getFullYear() } by Title` }
            value={ email.footer_text || `Copyright © ${ new Date().getFullYear() } by ${ siteInfo.title }` }
            name='description'
            type='text'
            placeholder='Title here...'
            onChange={ (e) => onFooterChange('footer_text', e.target.value) }
         />
         <div className='footer__email__unsubscribe'>Unsubscribe</div>
      </div>
   );
};

Footer.propTypes = {
   onFooterChange: PropTypes.func,
   email: PropTypes.object,
   siteInfo: PropTypes.object,
};

export default Footer;
