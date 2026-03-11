import PropTypes from 'prop-types';

import IconNew from 'components/elements/iconsSize';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import Text, { SIZES as sizes, TYPES as types } from 'components/elements/TextNew';

import './index.scss';

const PauseCards = ({
   iconName,
   priceText,
   subtitleText,
   titleText,
   handlePausePreservePlan,
}) => {
   return (
      <div className='pause__card__wrapper'>
         <IconNew name={ iconName } />
         <div className='texts__wrapper'>
            <div className='title__wrapper'>
               <Text
                  inner={ titleText }
                  size={ sizes.xxlarge }
                  type={ types.new__weight }
                  style={ {
                     color: '#131F1E',
                  } }
               />
            </div>
            <div className='prcie__text__wrapper'>
               <Text 
                  inner={ `$${ priceText }` }
                  size={ sizes.new36 }
                  style={ {
                     color: '#131F1E',
                  } }
               />
               <Text 
                  inner='/mo'
                  size={ sizes.xxlarge }
                  style={ {
                     color: '#131F1E',
                     fontWeight: 800,
                  } }
               />
            </div>
            <div className='title__wrapper'>
               <Text 
                  inner={ subtitleText }
                  size={ sizes.small_new }
                  style={ {
                     color: '#727978',
                     lineHeight: 1.7,
                  } }
               />
            </div>
         </div>
         <BaseButton 
            text='Pause And Subscribe'
            style={ {
               height: '44px',
               fontSize: '14px',
            } }
            onClick={ handlePausePreservePlan }
         />
      </div>
   );
};

PauseCards.propTypes = {
   iconName: PropTypes.string,
   priceText: PropTypes.string,
   subtitleText: PropTypes.string,
   titleText: PropTypes.string,
   handlePausePreservePlan: PropTypes.func,
};

export default PauseCards;