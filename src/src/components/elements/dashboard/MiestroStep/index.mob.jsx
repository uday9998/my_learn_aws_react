import React, { useState } from 'react';
import './index.mob.scss';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import GetStartedSignUp from 'components/elements/dashboard/GetStartedSignUp/index.mob';

const MiestroStep = ({ finished, text }) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <div
            className={ `mob-miestroStep mob-miestroStep_finished_${ finished } mob-miestroStep_isOpen_${ isOpen }` }
            onClick={ !finished ? (() => setIsOpen(!isOpen)) : null }
            role='presentation'
         >
            <div className='mob-miestroStep__icon-wrapper'>
               { finished ? <Icon className='mob-miestroStep__icon' name='Step' /> : null }
            </div>
            <Text
               type={ finished ? TextType.regular : TextType.normal }
               size={ TextSize.extraSmall }
               inner={ text }
            />
            { !finished && (
               <div className='mob-miestroStep__triangle'>
                  <Icon name='TriangleDown' />
               </div>
            ) }
         </div>
         {
            isOpen && (
               <div className='mob-miestroStep__content'>
                  <GetStartedSignUp />
               </div>
            )
         }
      </>
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
