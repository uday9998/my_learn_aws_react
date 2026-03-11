import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import dimondIMage from 'assets/images/community/dimond.png';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';

const PlansEmpty = ({ onCreatePlan }) => {
   return (
      <div className='plans__empty'>
         <img src={ dimondIMage } alt='' />
         <Text
            inner="You don't have plans yet"
            type={ types.regularDefault }
            size={ sizes.small }
         />
         <Text
            inner="Let's start creating plans for your products."
            type={ types.regularDefaultSmall }
            size={ sizes.size_28 }
            style={ { textAlign: 'center' } }
         />
         <Button
            text='Create Plan'
            onClick={ onCreatePlan }
         />
      </div>
   );
};

PlansEmpty.propTypes = {
   onCreatePlan: PropTypes.func,
};

export default PlansEmpty;
