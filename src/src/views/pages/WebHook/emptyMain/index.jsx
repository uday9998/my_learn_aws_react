import React from 'react';
import PropTypes from 'prop-types';
import Text, { TYPE as textType, SIZES as textSize } from 'components/elements/Text';
import BaseButton, { SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import webhookTriangle from 'assets/images/webhookTriangle.png';
import './index.scss';

const WebHookEmptyMain = ({ goToCreateMode }) => {
   return (
      <div className='webHookEmptyMain'>
         <img src={ webhookTriangle } alt='' className='webHookEmptyMainLogo' />
         <Text
            type={ textType.bold }
            size={ textSize.robotoExtraLarge }
            inner='Add Your First Webhook'
         />
         <div className='webHookEmptyMainTitleBelow'>
            <Text
               type={ textType.bold }
               size={ textSize.robotoMedium }
               inner='A webhook is a more advanced integration thet allows you send information from your Miestro school to other online applications.'
            />
         </div>
         <div className='webhook-btns'>
            <div style={ { marginRight: '16px' } }>
               <a href='https://support.miestro.com/article/277-how-to-create-a-webhook' target='_blank' title='Learn More' rel='noopener noreferrer'>
                  <BaseButton
                     size={ btnSize.full }
                     text='Learn More'
                     style={ { borderRadius: '0px', height: '32px' } }
                     onClick={ () => {} }
                  />
               </a>
            </div>
            <div style={ { width: '216px' } }>
               <BaseButton
                  size={ btnSize.full }
                  text='New Webhook'
                  style={ { borderRadius: '0px', height: '32px' } }
                  onClick={ () => goToCreateMode() }
               />
            </div>
         </div>
      </div>
   );
};

WebHookEmptyMain.propTypes = {
   goToCreateMode: PropTypes.func,
};

export default WebHookEmptyMain;
