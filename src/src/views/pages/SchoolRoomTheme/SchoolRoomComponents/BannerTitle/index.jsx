/* eslint-disable camelcase */
import React, { useState } from 'react';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import InlineEditor from 'components/modules/InlineEditor';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { SafeHtml } from 'utils/sanitizeHtml';
import './index.scss';
import { OfferContext } from 'containers/pages/mixed/offers';

const BannerTitle = (props) => {
   const {
      slug, className, onClick, color, fontSize, lineHeight, isPreview,
      paddingTop, paddingBottom, paddingLeft, paddingRight, textAlign, width, maxWidth,
      title, style, text,
      handleDuplicateComponent, handleDeleteComponent,
      index, subIndex, sectionIndex,
   } = props;
   const { changeProp } = React.useContext(OfferContext);
   const [active, setActive] = useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };

   return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div
         role='presentation'
         className={ classnames({
            'text': !active || isPreview,
            'text mark': active && !isPreview,
            [`${ className }`]: !!className,
         }) }
         onClick={ (e) => onClick(e) }
         data-slug={ slug }
         id={ slug }
         onMouseEnter={ (e) => toggle(e, 'enter') }
         onMouseLeave={ (e) => toggle(e, 'leave') }
      >
         <div
            style={ {
               color,
               fontSize: `${ fontSize }px`,
               lineHeight,
               textAlign,
               width: `${ width }%`,
               maxWidth: maxWidth === 'initial' ? maxWidth : `${ maxWidth }px`,
               paddingTop: `${ paddingTop }vw`,
               paddingBottom: `${ paddingBottom }vw`,
               paddingLeft: `${ paddingLeft }vw`,
               paddingRight: `${ paddingRight }vw`,
               fontFamily: 'Avenir Next',
               fontWeight: '600',
            } }
            className='banner_title_wrapper'
         >
            <style>
               {
                  `.banner_title_wrapper .inlineEditor *  {
                color: ${ color || '#fff' };
            }`
               }
            </style>
            { ((isPreview)

               ? (
                  <> { text ? (

                     <SafeHtml
                        html={ text }
                        style={ { ...style, color } }
                     />
                  )
                     : (
                        <Text
                           type={ TextType.normal }
                           size={ TextSize.extraLarge }
                           inner={ title }
                           color={ color }
                           style={ { ...style } }
                        />
                     )}
                  </>
               )


               : (
                  <InlineEditor
                     text={ text || title }
                     slug={ slug }
                     changeProp={ changeProp }
                     index={ index }
                     subIndex={ subIndex }
                     sectionIndex={ sectionIndex }
                     handleDuplicateComponent={ handleDuplicateComponent }
                     handleDeleteComponent={ handleDeleteComponent }
                     isSubcomponent={ true }
                  />
               ))}
         </div>
      </div>
   );
};


BannerTitle.defaultProps = {
   color: '#fff',
   paddingLeft: '0',
   paddingRight: '0',
   paddingTop: '0',
   paddingBottom: '0',
   lineHeight: '1',
   width: '100',
   maxWidth: 'initial',
};

BannerTitle.propTypes = {
   slug: PropTypes.string,
   className: PropTypes.string,
   onClick: PropTypes.func,
   style: PropTypes.object,
   color: PropTypes.string,
   fontSize: PropTypes.any,
   lineHeight: PropTypes.string,
   text: PropTypes.string,
   isPreview: PropTypes.bool,
   paddingLeft: PropTypes.string,
   paddingRight: PropTypes.string,
   paddingTop: PropTypes.string,
   paddingBottom: PropTypes.string,
   textAlign: PropTypes.string,
   width: PropTypes.string,
   maxWidth: PropTypes.string,
   title: PropTypes.string,
   handleDuplicateComponent: PropTypes.func,
   handleDeleteComponent: PropTypes.func,
   index: PropTypes.number,
   subIndex: PropTypes.number,
   sectionIndex: PropTypes.number,
};

export default BannerTitle;
