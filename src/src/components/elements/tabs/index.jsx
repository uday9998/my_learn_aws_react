import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { communityButtonColors, communityButtonTextColor } from 'utils/communityButtonColors';
import IconNew from 'components/elements/iconsSize';

const Tabs = ({
   variants = [], selectedVariant, isButton = true, onSelect, isFullWidth, hasIcon, withGradient, isPlayList,
   isCommunity, community,
}) => {
   if (!isButton) {
      return (
         <div className='tabs__line'>
            {variants.map((tab) => {
               return (
                  <div
                     className={ `${ isFullWidth ? 'tabs__line__tab' : 'tabs__line__initial' }   ${ selectedVariant === tab.value && 'tabs__line__tab__active' }` }
                     onClick={ () => onSelect(tab.value) }
                     role='presentation'
                     key={ uniqueId() }
                  >
                     {hasIcon && !isPlayList && <IconNew name={ selectedVariant === tab.value ? `${ tab.iconName }Active` : tab.iconName } />}
                     {isPlayList && hasIcon && <IconNew name={ tab.iconName } color={ selectedVariant === tab.value ? '#24554E' : '#22272F' } />}
                     <Text
                        inner={ tab.key === 'Classes' ? 'Products' : tab.key }
                        type={ txtTypes.regularDefault }
                        size={ txtSizes.small }
                        style={ { color: selectedVariant === tab.value ? '#24554E' : '#131F1E', fontWeight: '400' } }
                     />
                     {!!tab.count && (
                        <div className='tabs__line__tab__count'>
                           <Text
                              inner={ tab.count }
                              type={ txtTypes.medium150 }
                              size={ txtSizes.xsmall }
                              style={ { color: '#fff' } }
                           />
                        </div>
                     )}
                     {(tab.commentsCount || tab.commentsCount === 0) && (
                        <div className='tabs__line__tab__comments'>
                           <IconNew name='CommentsProgramS' />
                           <Text
                              inner={ `${ tab.commentsCount }` }
                              type={ txtTypes.medium150 }
                              size={ txtSizes.xsmall }
                           />
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      );
   }
   return (
      <div className='tabs'>
         {variants.map((variant) => {
            return (
               <div
                  onClick={ () => onSelect(variant.value) }
                  role='presentation'
                  key={ uniqueId() }
                  className={ `tabs__tab ${ selectedVariant === variant.value && `tabs__tab__active${ withGradient }` }` }
                  style={ isCommunity && selectedVariant === variant.value ? communityButtonColors(community) : { } }
               >
                  {hasIcon && <IconNew name={ selectedVariant === variant.value ? `${ variant.iconName }Active` : variant.iconName } color={ isCommunity && selectedVariant === variant.value ? communityButtonTextColor(community) : '' } />}
                  <Text
                     inner={ variant.key }
                     type={ txtTypes.regularDefault }
                     size={ txtSizes.small }
                     style={ isCommunity && selectedVariant === variant.value ? communityButtonColors(community) : { color: selectedVariant === variant.value ? '#FFFFFF' : '#131F1E' } }
                     
                  />
               </div>
            );
         })}
      </div>
   );
};

Tabs.propTypes = {
   variants: PropTypes.array,
   selectedVariant: PropTypes.any,
   isButton: PropTypes.bool,
   onSelect: PropTypes.func,
   isFullWidth: PropTypes.bool,
   hasIcon: PropTypes.bool,
   isPlayList: PropTypes.bool,
   withGradient: PropTypes.string,
   isCommunity: PropTypes.bool,
   community: PropTypes.object,
};

Tabs.defaultProps = {
   isFullWidth: true,
   hasIcon: false,
   withGradient: '',
};

export default Tabs;
