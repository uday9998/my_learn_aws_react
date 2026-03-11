import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';

const MiestroStep = ({ finished, text }) => {
   return (
      <div className={ `miestroStep miestroStep_finished_${ finished }` }>
         <div className='miestroStep__icon-wrapper'>
            { finished ? <Icon className='miestroStep__icon' name='Step' /> : null }
         </div>
         <Text
            type={ finished ? TextType.regular : TextType.normal }
            size={ TextSize.extraSmall }
            inner={ text }
         />
         { !finished && <span className='miestroStep__right-triangle' /> }
      </div>
   );
};

MiestroStep.propTypes = {
   finished: PropTypes.bool,
   text: PropTypes.string,
};
MiestroStep.defaultProps = {
   finished: false,
   text: 'Finished Step',
};

export default MiestroStep;
