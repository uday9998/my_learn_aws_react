import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Line from 'components/elements/Line';
import Input from 'components/elements/inputNew';

const TrackingPageRight = ({ settings, handleInputChange }) => {
   return (
      <div className='plan__tracking__page__right'>
         {settings.map((e) => {
            return (
               <>
                  <div className='plan__tracking__page__right__block'>
                     <div className='plan__tracking__page__right__block__top'>
                        <Text
                           inner={ e.title }
                           type={ types.medium150 }
                           size={ sizes.medium }
                        />
                        <Text
                           inner={ e.description }
                           type={ types.regularDefault }
                           size={ sizes.small }
                           style={ { color: '#727978' } }
                        />
                     </div>
                     <Input
                        type='textarea'
                        value={ e.value }
                        placeholder={ `Place your ${ e.placeholder } code here...` }
                        onChange={ handleInputChange }
                        name={ e.name }
                     />
                  </div>
                  {e.last && <Line />}
               </>
            );
         })}
      </div>
   );
};

TrackingPageRight.propTypes = {
   settings: PropTypes.object,
   handleInputChange: PropTypes.func,
};

export default TrackingPageRight;
