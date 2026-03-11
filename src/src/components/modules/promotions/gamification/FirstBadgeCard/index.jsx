/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import add from 'assets/images/promotions/add-section.png';

const FirstBadgeCard = ({ addBadge }) => {
   return (
      <SelectedWrapper>
         <div className='firstBadgeCard'>
            <Text
               type={ TextType.bold }
               size={ TextSize.medium }
               inner='Add Your First Badge'
            />
            <div className='m-t-exs'>
               <Text
                  type={ TextType.regular }
                  size={ TextSize.small }
                  bold
                  inner='This module will show you how easily you can create a goal inside the Miestro gamification system.
               When users complete the goal or lesson they can receive a task badge.'
                  color='#8a94a2'
               />
            </div>
            <div className='firstBadgeCard__addBadge'>
               <div className='addBadgeImg m-t-l m-b-l'>
                  <img src={ add } alt='add badge' onClick={ () => addBadge() } />
               </div>
               <div className='btnWrapper'>
                  <BaseButton
                     theme={ btnTheme.darkGreen }
                     size={ btnSize.large }
                     text='Add Badge'
                     onClick={ () => addBadge() }
                  />
               </div>
            </div>
         </div>
      </SelectedWrapper>
   );
};

FirstBadgeCard.propTypes = {
   addBadge: PropTypes.func,
};

export default FirstBadgeCard;
