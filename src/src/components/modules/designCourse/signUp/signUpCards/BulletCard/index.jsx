import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import '../index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import Tooltip from 'components/elements/members/Tooltip';
import BulletCardItem from './BulletCardItem';

const BulletCard = ({
   signUp, handleInputSignUpChange, handleSignUpSave, deleteSignUp,
   chooseBullet, currentBullet, previewCheckout, handleAddBullet, settings,
}) => {
   return (

      <ItemWrapper>
         <div className='signUpCard'>
            <div className='flex'>
               <Text
                  type={ TextType.bold }
                  size={ TextSize.medium }
                  inner='Bullet Points'
               />
               <Tooltip
                  hintText='What top feautures do you want to highlight? This would be a good place to do so.'
                  style={ { top: '-3px' } }
                  hintStyle={ { bottom: 'auto', top: '18px', width: '230px' } }
               />
            </div>
            <div className='signUpCard__content'>
               <Text
                  type={ TextType.normal }
                  size={ TextSize.extraSmall }
                  inner='Bullet Point'
               />
               <Text
                  type={ TextType.regular }
                  size={ TextSize.extraSmall }
                  inner='Add bullet points to list the benefits or features of your product'
                  color='#8a94a2'
               />
            </div>
            {signUp['bullet-points'] && signUp['bullet-points'].map(bullet => (
               <BulletCardItem
                  key={ bullet.id }
                  bullet={ bullet }
                  handleInputSignUpChange={ handleInputSignUpChange }
                  handleSignUpSave={ handleSignUpSave }
                  deleteSignUp={ deleteSignUp }
                  chooseBullet={ chooseBullet }
                  currentBullet={ currentBullet }
               />
            )
            )}
            {(signUp['bullet-points'].length === 0 || signUp.isBulletSaved) && (
               <>
                  <BulletCardItem
                     bullet={ signUp.newBulletInput }
                     newBullet
                     handleInputSignUpChange={ handleInputSignUpChange }
                     handleSignUpSave={ handleSignUpSave }
                     handleAddBullet={ handleAddBullet }
                  />
               </>
            )}
            { signUp['bullet-points'].length !== 0 && signUp['bullet-points'].length !== 5 && !signUp.isBulletSaved && (
               <div className='btnsBlock'>
                  {settings.pricings && settings.pricings.length !== 0 && (
                     <BaseButton
                        theme={ btnTheme.grey }
                        size={ btnSize.full }
                        text='Preview'
                        onClick={ () => previewCheckout() }
                     />
                  )}
                  <BaseButton
                     theme={ btnTheme.greenBordered }
                     size={ btnSize.full }
                     text='Add Another Bullet'
                     style={ { width: '236px' } }
                     // eslint-disable-next-line no-param-reassign
                     onClick={ () => { signUp.newBulletInput = {}; handleAddBullet(true); } }
                  />
               </div>
            )
            }

         </div>
      </ItemWrapper>
   );
};


BulletCard.propTypes = {
   signUp: PropTypes.object,
   handleSignUpSave: PropTypes.func,
   handleInputSignUpChange: PropTypes.func,
   deleteSignUp: PropTypes.func,
   currentBullet: PropTypes.object,
   chooseBullet: PropTypes.func,
   handleAddBullet: PropTypes.func,
   previewCheckout: PropTypes.func,
   settings: PropTypes.object,
};

export default BulletCard;
