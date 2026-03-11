import React from 'react';
import './index.scss';
import Text, { SIZES as textSize, TYPE as textType } from 'components/elements/Text';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
// import PropTypes from 'prop-types';
import recorderGraph from 'assets/images/dashboard/graphbig.png';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';

const RecorderExtension = () => {
   return (
      <div className='recorderExtension'>
         <ItemWrapper>
            <div className='recorderExtension__content'>
               <div className='recorderExtension__content__left'>
                  <div>
                     <Text
                        size={ textSize.extraLarge }
                        type={ textType.normal }
                        inner='Miestro Recorder Extension'
                     />
                  </div>
                  <div className='ext__description'>
                     <Text
                        size={ textSize.extraSmall }
                        type={ textType.regular }
                        inner='Download the chrome extension to record your trainings and upload them directly into Miestro in one-click'
                     />
                  </div>
                  <div className='ext__btns'>
                     <div>
                        <a href='https://support.miestro.com/miestro-screen-recorder' rel='noopener noreferrer' target='_blank'>
                           <BaseButton
                              theme={ btnTheme.lightGreen }
                              size={ btnSize.large }
                              text='Learn More'
                           // onClick={()={}}
                           />
                        </a>
                     </div>
                     <div>
                        <a href='https://chrome.google.com/webstore/detail/miestro-recorder/pdgeplhoanahgmhppbfndfllfgmkmdfb' rel='noopener noreferrer' target='_blank'>
                           <BaseButton
                              theme={ btnTheme.darkGreen }
                              size={ btnSize.large }
                              text='Download The Extension'
                              // onClick={()={}}
                           />
                        </a>
                     </div>
                  </div>
               </div>
               <div className='recorderExtension__content__right'>
                  <img src={ recorderGraph } alt='Miestro Recorder Extension' title='Miestro Recorder Extension' />
               </div>

            </div>
         </ItemWrapper>
      </div>

   );
};

RecorderExtension.propTypes = {

};

export default RecorderExtension;
