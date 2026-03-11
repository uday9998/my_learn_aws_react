import React from 'react';
import Text, { SIZES as textSize, TYPE as textType } from 'components/elements/Text';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import classnames from 'classnames';

const NavCard = ({
   title, icon, content, active, img, changeTab, textColor, primaryTheme, commentStatus, defaultColor,
}) => {
   return (
      <div
         role='presentation'
         onClick={ changeTab }
         style={ {
            borderColor: textColor,
            color: textColor,
         } }
         className={
            classnames([
               'navCard',
               {
                  'navCard-active': active,
               },
            ]) }
      >
         <Text
            size={ textSize.extraSmall }
            type={ textType.demiBold }
            inner={ title }
            style={ { fontFamily: primaryTheme, lineHeight: 'unset' } }
            color={ active ? textColor : defaultColor }
         />
         <div className=''>
            {/* {(img && <img src={ img } alt='logo' />) || <Icon name={ icon } color={ textColor } />} */}
            {/* <Text
               size={ textSize.extraSmall }
               type={ textType.normal }
               inner={ content }
               style={ { fontFamily: primaryTheme } }
               // color='#fff'
            /> */}
         </div>
         {/* {
            active && (
               <span
                  className='navCard__triangle'
                  style={ {
                     borderColor: textColor,
                  } }
               />
            )
         } */}
      </div>
   );
};

NavCard.propTypes = {
   title: PropTypes.string,
   icon: PropTypes.string,
   content: PropTypes.string,
   img: PropTypes.string,
   active: PropTypes.bool,
   changeTab: PropTypes.func,
   textColor: PropTypes.string,
   primaryTheme: PropTypes.string,
   defaultColor: PropTypes.string,
};

NavCard.defaultProps = {
   title: 'Title',
   content: 'Content',
   img: '',
   active: false,
   icon: 'Comment',
   changeTab: () => {},
};

export default NavCard;
