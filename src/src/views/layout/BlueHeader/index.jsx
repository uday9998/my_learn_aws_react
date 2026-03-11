import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import './index.scss';
import Icon from 'components/elements/Icon';

const BlueHeader = ({
   rightSide, style, styleClass, topLevel, goToBack,
}) => {
   return (
      <div className={ `header-container ${ styleClass }` } style={ style }>
         <div className='header-content'>
            {
               !topLevel && (
                  <div
                     role='presentation'
                     onClick={ goToBack }
                     className='m-r-exs left-icon'
                  >
                     <Icon
                        name='Left'
                     />
                  </div>
               )
            }
            {
               topLevel && (
                  <div
                     role='presentation'
                     onClick={ goToBack }
                  >
                     <Icon name='Logo' className={ `${ styleClass }Icon` } />
                  </div>
               )
            }
            {rightSide}
         </div>
      </div>
   );
};

const righSideDefault = () => {
   return (
      <Text
         color='#ffffff'
         type={ TextType.bold }
         size={ TextSize.medium }
         inner='Complete Purchase'
      />
   );
};

export default BlueHeader;

BlueHeader.propTypes = {
   style: PropTypes.object,
   styleClass: PropTypes.string,
   topLevel: PropTypes.bool,
   goToBack: PropTypes.func,
   rightSide: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
};

BlueHeader.defaultProps = {
   rightSide: righSideDefault(),
   styleClass: 'main-style',
   topLevel: true,
   goToBack: () => {},
};
