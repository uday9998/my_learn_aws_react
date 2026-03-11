import React from 'react';
import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnTheme, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import {
   useHistory,
} from 'react-router-dom';
import Icon from 'components/elements/Icon';
// import courseLogo from 'assets/images/course-logo.png';
import Text, { TYPES as TextType, SIZES as TextSize } from 'components/elements/TextNew';
import './index.scss';

const Congratulations = ({ closeModal, courseName }) => {
   const history = useHistory();
   return (
      <div className='congratulations'>
         <div
            className='congratulationsCloseIcon'
            role='presentation'
            onClick={ () => closeModal() }
         >
            <Icon name='CloseXNew' />
         </div>
         <div className='congratulationsRectangle'>
            <div className='titleRectangle'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.large }
                  inner='Congratulations!'
                  className='congratulationsTitle'
                  color='#3f4f65'
               />
               <br />
               <Text
                  type={ TextType.normal }
                  size={ TextSize.large }
                  inner={ `You Completed ${ courseName } Class!` }
                  className='congratulationsTitle'
                  color='#3f4f65'
               />
            </div>
            <BaseButton
               theme={ btnTheme.primary }
               size={ btnSizes.large }
               text='Get Your Certificate'
               onClick={ () => { closeModal(); history.push('/my-account#certificates'); } }
            />
         </div>

      </div>
   );
};

Congratulations.propTypes = {
   closeModal: PropTypes.func,
   courseName: PropTypes.string,

};

export default Congratulations;
