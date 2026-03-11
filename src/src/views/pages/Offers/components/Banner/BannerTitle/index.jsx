/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import toggleHighlighted from 'utils/pageBuilder/toggleHighlighted';
import { OfferContext } from 'containers/pages/mixed/offers';
import classNames from 'classnames';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import InlineEditor from 'components/modules/InlineEditor';
import { SafeHtml } from 'utils/sanitizeHtml';

const BannerTitle = (props) => {
   const [active, setActive] = React.useState(false);
   const toggle = (e, action) => {
      setActive(toggleHighlighted(e, active, action));
   };
   const { bannerTitle } = props;
   const {
      isEditor, site, onClickElement, changeProp, isPreview,
   } = React.useContext(OfferContext);
   const { slug } = bannerTitle;
   const {
      color, lineHeight, textAlign, fontSize, maxWidth, paddingTop, paddingBottom, paddingLeft,
      paddingRight, text, justifyContent, alignItems, visibility,
   } = bannerTitle.props;
   if (!visibility) {
      return null;
   }

   return (
      <div className='banner__title' style={ { justifyContent, alignItems } }>
         <div
            role='presentation'
            className={ classNames({
               'text': !active || !isEditor,
               'text mark': active && isEditor,
            }) }
            onClick={ (e) => onClickElement(e) }
            data-slug={ slug }
            id={ slug }
            onMouseOver={ toggle }
            onMouseOut={ toggle }
         >
            <div style={ {
               color,
               fontSize: `${ fontSize }px`,
               lineHeight,
               textAlign,
               width: `${ 100 }%`,
               maxWidth: maxWidth === 'initial' ? maxWidth : `${ maxWidth }px`,
               paddingTop: `${ paddingTop }vw`,
               paddingBottom: `${ paddingBottom }vw`,
               paddingLeft: `${ paddingLeft }vw`,
               paddingRight: `${ paddingRight }vw`,
               // fontFamily: 'Lexend Deca',
               fontWeight: '700',
            } }
            >
               <style>
                  {
                     `.banner__title .inlineEditor *  {
                color: ${ color || '#fff' };
            }`
                  }
               </style>
               {((!isEditor)
                  ? (
                     <> { text ? (

                        <SafeHtml
                           html={ text }
                           style={ { fontWeight: '700', color: color || '#fff', fontSize: '40px' } }
                        />
                     )
                        : (
                           <Text
                              inner={ site.title }
                              type={ types.regularDefaultSmall }
                              size={ sizes.size_40 }
                              style={ { fontWeight: '700', color: color || '#fff' } }
                           />
                        )}
                     </>
                  )

                  : (
                     <InlineEditor
                        text={ text || site.title }
                        slug={ slug }
                        changeProp={ changeProp }
                        index={ 0 }
                        subIndex={ 0 }
                        sectionIndex={ 2 }
                        isSubcomponent={ true }
                     />
                  ))}
               {/* <Text
                  inner={ text || site.title }
                  type={ types.regularDefaultSmall }
                  size={ sizes.size_40 }
                  style={ { fontWeight: '700', color: color || '#fff' } }
               /> */}
            </div>
         </div>
      </div>
   );
};

BannerTitle.propTypes = {
   bannerTitle: PropTypes.object,
};

export default BannerTitle;
