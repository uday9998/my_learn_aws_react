import React from 'react';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';

const PlanItem = ({ icon, title }) => {
   return (
      <div className='planItem'>
         <img src={ icon } alt='icon' />
         <Text
            style={ { fontWeight: 600 } }
            type={ TextType.regular }
            size={ TextSize.small }
            inner={ title }
         />
      </div>
   );
};

PlanItem.propTypes = {
   icon: PropTypes.string,
   title: PropTypes.string,
};

PlanItem.defaultProps = {
   icon: '',
   title: 'Title',
};

export default PlanItem;
