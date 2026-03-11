import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Icon from '../Icon';
import './index.scss';

const StatusPrsent = ({ status, prsent, isZero }) => {
   return (
      <div className={ `status__prsent status__prsent__${ status }` }>
         {isZero !== 0 && (<Icon name={ `ArrowStatus${ status }` } />)}
         <Text
            inner={ `${ prsent } %` }
            className={ `status__prsent__text__${ status }` }
            type={ txtTypes.regularLarge }
            size={ txtSizes.xsmall }
         />
      </div>
   );
};

StatusPrsent.propTypes = {
   status: PropTypes.string,
   prsent: PropTypes.any,
   isZero: PropTypes.any,
};

export default StatusPrsent;
