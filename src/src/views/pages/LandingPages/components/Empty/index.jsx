import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';

const EmptyLangingPage = ({ onCreate }) => {
   return (
      <div className='landing__empty__page'>
         <Text
            inner="You don't have Landing Page yet"
            type={ types.regularDefault }
            size={ sizes.small }
            style={ { marginTop: '16px' } }
         />
         <Text
            inner="Let's start creating landing page now."
            type={ types.regularMin }
            size={ sizes.size_28 }
         />
         <Button
            onClick={ () => onCreate() }
            style={ { marginTop: '32px' } }
            text='Create Landing Page'
         />
      </div>
   );
};

EmptyLangingPage.propTypes = {
   onCreate: PropTypes.func,
};

export default EmptyLangingPage;
