import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import './index.scss';

function Author({
   name, avatar, description, className,
}) {
   return (
      <div className={ `flex authorcard ${ className }` }>
         <div className='avatar'>
            <img src={ avatar } alt='Class author' />
         </div>
         <div className={ `authorinfo m-l-exs ${ !description && 'no-description-author' }` }>
            <div>
               <Text
                  type={ TextType.demiBold }
                  size={ TextSize.base }
                  inner={ name }
                  color='#fff'
                  style={ { lineHeight: 'normal' } }
               />
            </div>
            <div>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.megaSmall }
                  inner={ description }
                  color='#fff'
                  style={ { opacity: '.7', lineHeight: 'normal' } }
               />
            </div>
         </div>
      </div>
   );
}

Author.propTypes = {
   name: PropTypes.string,
   avatar: PropTypes.string,
   description: PropTypes.func,
   className: PropTypes.string,
};

export default Author;
