import React from 'react';
import './index.scss';
import BaseButton from 'components/elements/buttons/BaseButton';
import backImg from 'assets/images/pageBuilder/img1.png';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const BuilderCard = ({ focused, imgSrc }) => {
   return (
      <div className={
         classnames([
            'builderCard',
            {
               [`builderCard_checked_${ focused }`]: focused,
            },
         ]) }
      >
         <div className='builderCard__imgBlock'>
            <img src={ imgSrc } alt='' />
         </div>
         <div className='buttonsBlock'>
            <div className='builderCard__btn'>
               <BaseButton
                  text='Preview'
                  theme='lightGreen'
                  size='large'
               />
            </div>
            <div className='builderCard__btn'>
               <BaseButton
                  text={ (focused && 'Edit') || 'Choose' }
                  theme='darkGreen'
                  size='large'
                  style={ focused ? { backgroundColor: '#4d8514' } : {} }
               />
            </div>
         </div>
      </div>
   );
};

BuilderCard.propTypes = {
   focused: PropTypes.bool,
   imgSrc: PropTypes.string,
};

BuilderCard.defaultProps = {
   focused: false,
   imgSrc: backImg,
};

export default BuilderCard;
