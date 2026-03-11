import React from 'react';
import Text, { TYPES as types, SIZES as sizes, TextColumn } from 'components/elements/TextNew';
import PropTypes from 'prop-types';
import IconNew from 'components/elements/iconsSize';
import Button from 'components/elements/buttons/BaseButtonNew';
import './index.scss';
import image from 'assets/images/automationEmptyBackground.png';

const AutomationEmptyPage = ({ goToCreatePage }) => {
   return (
      <div className='automation__empty'>
         <div className='automation__empty__left'>
            <div className='automation__empty__left__dots'>
               <IconNew name='DotsL' />
            </div>
            <div className='automation__empty__left__top'>
               <Text
                  inner='Create your Automation'
                  type={ types.bold133 }
                  size={ sizes.xxlarge }
               />
               <TextColumn
                  texts={ ['Start sharing your knowledge from the worlds', 'and make a profit'] }
                  type={ types.regular148 }
                  size={ sizes.small }
                  style={ { color: '#727978' } }
               />
            </div>
            <Button
               text='Create Automation'
               onClick={ () => goToCreatePage() }
            />
         </div>
         <div className='automation__empty__right'>
            <div className='automation__empty__right__dots'>
               <IconNew name='DotsL' />
            </div>
            <img src={ image } alt='' />
         </div>
      </div>
   );
};


AutomationEmptyPage.propTypes = {
   goToCreatePage: PropTypes.func,
};

export default AutomationEmptyPage;
