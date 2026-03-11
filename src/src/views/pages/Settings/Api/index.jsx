import React, { useState } from 'react';
import './index.scss';
import BaseButton, { THEMES as btnTheme } from 'components/elements/buttons/BaseButtonNew';
import PropTypes from 'prop-types';
import Text, { TYPES as textType, SIZES as textSize } from 'components/elements/TextNew';
import IToolTip from 'components/elements/IToolTIp';
import Icon from 'components/elements/Icon';
import { copyToClipBoard } from 'utils/copy';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import { v4 as uuidv4 } from 'uuid';


const Api = ({ getApiKeyInProgress, apiData, createApiKey }) => {
   const [isShowedSecret, setIsShowedSecret] = useState(false);
   const symbols = new Array(apiData.api_secret ? apiData.api_secret.length : 0).fill(0);
   return (
      <div className='api__view'>
         {getApiKeyInProgress ? <LoaderSpinner /> : (
            <>
               <div className='api__view__header'>
                  <div className='api__view__header__left'>
                     {/* <div className='top'>
                        <Text
                           inner='Api'
                           type={ textType.mediumSmall }
                           size={ textSize.medium }
                        />
                     </div> */}
                     <div className='bottom'>
                        <Text
                           inner='API credentials for this account'
                           type={ textType.regularDefault }
                           style={ { color: '#727978' } }
                           size={ textSize.small }
                        />
                     </div>
                  </div>
                  <div className='api__view__header__right'>
                     <a href='https://support.miestro.com/331951-API-Documentation' alt='help' target='_blank' rel='noreferrer'>
                        <BaseButton
                           text='Learn More'
                           theme={ btnTheme.secondary }
                           onClick={ () => {} }
                        />
                     </a>
                  </div>
               </div>
               <div className='api__view__content'>
                  {
                     apiData.api_key ? (
                        <div className='api__view__content__field'>
                           <Text
                              inner='Api Key'
                              type={ textType.regularDefault }
                              size={ textSize.small }
                           />
                           <div className='api__view__content__field__input'>
                              <div className='left'>
                                 <Text
                                    inner={ apiData.api_key }
                                    type={ textType.regularDefault }
                                    size={ textSize.small }
                                    style={ { color: '#727978' } }
                                 />
                              </div>
                              <div className='right' role='presentation' onClick={ () => copyToClipBoard(apiData.api_key) }>
                                 <Icon name='copyNew' />
                              </div>
                           </div>
                        </div>
                     ) : ''
                  }

                  {
                     apiData.api_secret ? (
                        <div className='api__view__content__field'>
                           <Text
                              inner='Api Secret'
                              type={ textType.regularDefault }
                              size={ textSize.small }
                           />
                           <div className='api__view__content__field__input'>
                              <div className='left'>
                                 {isShowedSecret ? (
                                    <div className='api__view__content__field__hide'>
                                       {symbols.map(() => {
                                          return (
                                             <div className='symbol__round' key={ uuidv4() } />
                                          );
                                       })}
                                    </div>
                                 ) : (
                                    <Text
                                       inner={ apiData.api_secret }
                                       type={ textType.regularDefault }
                                       size={ textSize.small }
                                       style={ { color: '#727978' } }
                                    />
                                 )}
                              </div>
                              <div className='right__flex'>
                                 <div className='right' role='presentation' onClick={ () => setIsShowedSecret(!isShowedSecret) }>
                                    {isShowedSecret ? <Icon name='Show' /> : <Icon name='UnShown' /> }
                                 </div>
                                 <div className='right' role='presentation' onClick={ () => copyToClipBoard(apiData.api_secret) }>
                                    <Icon name='copyNew' />
                                 </div>
                              </div>
                           </div>
                        </div>
                     ) : ''
                  }


                  <BaseButton
                     text='Generate New'
                     theme={ btnTheme.primary }
                     onClick={ () => createApiKey() }
                     style={ { maxWidth: 'max-content' } }
                  />
               </div>
            </>
         )}
      </div>
   );
};

Api.propTypes = {
   apiData: PropTypes.object,
   getApiKeyInProgress: PropTypes.bool,
   createApiKey: PropTypes.func,
};

export default Api;
