import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import Icon from 'components/elements/Icon';
import ReactTooltip from 'react-tooltip';

import Input from 'components/elements/inputNew';

const SiteHeader = ({
   isBack, title, tooltip, buttonProps, isSearch, right, goBackTo,
   marginTop,
}) => {
   const [search, setSearch] = useState('');

   return (
      <div
         style={ {
            marginTop,
         } }
         className='header'>
         <div className='header__top'>
            <div className='header__top__title'>
               {(isBack || goBackTo) && (<div role='presentation' onClick={ isBack || goBackTo } className='header__top__title__back'><Icon name='ArrowBackHeader' className='backIcon' /></div>)}
               <Text inner={ title } type={ txtTypes.mediumTitle } size={ txtSizes.size_28_res } />
               {/* {tooltip && (
                  <div className='tooltip' data-tip={ tooltip }>
                     <Icon name='ToolTip' className='backIcon' />
                     <ReactTooltip />
                  </div>
               )} */}
            </div>
            {right}
         </div>
         {buttonProps && (
            <BaseButton
               { ...buttonProps }
            />
         )}
         {isSearch && (
            <Input type='search' placeholder='Search' classI='navbar__search' value={ search } onChange={ (name, value) => setSearch(value) } />
         )}
      </div>
   );
};

SiteHeader.defaultProps = {
   isBack: false,
   title: 'Title',
   tooltip: '',
};

SiteHeader.propTypes = {
   links: PropTypes.object,
   isBack: PropTypes.any,
   title: PropTypes.string,
   buttonProps: PropTypes.object,
   tooltip: PropTypes.string,
   //  table: PropTypes.object,
   isSearch: PropTypes.bool,
   right: PropTypes.any,
   goBackTo: PropTypes.any,
   marginTop: PropTypes.number,
};

export default SiteHeader;

// import React from 'react';
// import './index.scss';
// import PropTypes from 'prop-types';
// import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
// import Icon from 'components/elements/Icon';
// import { useHistory } from 'react-router-dom';


// const SiteHeader = ({
//    title, titleSize, hasArrow, style, right, bottom, tooltip, tooltipresponsive, iconWidth, iconHeight,
//    noBorderPadding, goBackTo, goTo, tooltipStyle,
// }) => {
//    const history = useHistory();
//    return (
//       <div className='siteHeader' style={ { style, padding: noBorderPadding ? '24px 32px 0 32px' : '24px 32px' } }>
//          <div className='siteHeader__top'>
//             <div className='siteHeader__title'>
//                <div className={ tooltipresponsive ? 'flex course__name__resp' : 'flex course__name' }>
//                   {hasArrow && (
//                   // eslint-disable-next-line jsx-a11y/no-static-element-interactions
//                      <div
//                         style={ { width: iconWidth, height: iconHeight } }
//                         className='m-r-exs left-icon'
//                         onClick={ () => (goTo ? goBackTo() : history.goBack()) }
//                      >
//                         <Icon
//                            name='Left'
//                         />
//                      </div>
//                   )}
//                   <Text
//                      type={ textType.normal }
//                      size={ textSizes[titleSize] }
//                      inner={ title }
//                   />
//                </div>
//                {tooltip && (
//                   <div className='hint-block'>
//                      <div className='m-l-exs hint-icon'>
//                         <Icon
//                            name='Hint'
//                         />
//                      </div>
//                      <div className='hint-text' style={ tooltipStyle }>
//                         <Text
//                            type={ textType.normal }
//                            size={ textSizes.extraSmall }
//                            inner={ tooltip }
//                         />
//                      </div>

//                   </div>
//                )}

//             </div>
//             <div className='siteHeader__rightSide'>
//                {right}
//             </div>
//          </div>
//          <div className='siteHeader__bottom'>
//             { bottom }
//          </div>
//       </div>
//    );
// };

// SiteHeader.propTypes = {
//    title: PropTypes.string,
//    hasArrow: PropTypes.bool,
//    style: PropTypes.object,
//    right: PropTypes.oneOfType([
//       PropTypes.arrayOf(PropTypes.node),
//       PropTypes.node,
//    ]),
//    bottom: PropTypes.oneOfType([
//       PropTypes.arrayOf(PropTypes.node),
//       PropTypes.node,
//    ]),
//    tooltip: PropTypes.string,
//    tooltipresponsive: PropTypes.bool,
//    titleSize: PropTypes.string,
//    iconWidth: PropTypes.any,
//    iconHeight: PropTypes.any,
//    noBorderPadding: PropTypes.bool,
//    hintIcon: PropTypes.bool,
//    goBackTo: PropTypes.func,
//    goTo: PropTypes.func,
//    tooltipStyle: PropTypes.object,
// };

// SiteHeader.defaultProps = {
//    title: 'Title',
//    hasArrow: true,
//    right: null,
//    bottom: null,
//    tooltip: '',
//    tooltipresponsive: false,
//    titleSize: 'large',
//    noBorderPadding: false,
//    hintIcon: true,
// };

// export default SiteHeader;
