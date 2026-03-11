import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Button from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';

const SectionEmptyState = ({ openModal }) => {
   return (
      <div className='section__empty'>
         <IconNew name='SectionEmptyM' />
         <Text
            inner="You don't have sections yet"
            type={ types.regularDefault }
            size={ sizes.small }
            style={ { marginTop: '24px' } }
         />
         <Text
            inner="Let's start creating your first course section."
            type={ types.regularDefaultSmall }
            size={ sizes.size_28 }
            style={ { marginTop: '8px', marginBottom: '32px' } }
         />
         <Button
            text='Create Section'
            onClick={ () => openModal() }
         />
      </div>
   );
};

SectionEmptyState.propTypes = {
   openModal: PropTypes.func,
};

export default SectionEmptyState;
