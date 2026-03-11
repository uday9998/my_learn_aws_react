import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import TextInput from 'components/elements/inputNew';
import Text, { SIZES as txtSizes, TYPES as txtType } from 'components/elements/TextNew';
import BaseButton, { THEMES as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import Icon from 'components/elements/Icon';
import Router from 'routes/router';
import { Link } from 'react-router-dom';
import { isLocalhost } from 'utils/Helpers';
// import getCurrencySumbol from 'utils/getCurrencySymbol';


const apiUrl = isLocalhost() ? 'localhost:3000' : `https://${ window.location.host }`;
const checkoutUrl = process.env.REACT_APP_CHECKOUT_URL;

const CourseLinksModalContent = ({
   currentCourse, copyCodeToClipboard, copyView, isCheckoutPreview, app,
}) => {
   return (
      <div className='courseLinks'>
         <div className='title'>
            <Text
               size={ txtSizes.xlarge }
               type={ txtType.medium160 }
               inner={ isCheckoutPreview ? 'Signup Links' : 'Your Product Links' }
            />
            <Text
               inner='Here you can find all the links related to this product.'
               type={ txtType.regularDefault }
               size={ txtSizes.small }
               style={ { color: '#727978' } }
            />
            {/* <div className='close' role='presentation' onClick={ () => onCancel() }>
                  <Icon name='CloseX' />
               </div> */}

         </div>
         {!isCheckoutPreview
            && (
               <>
                  <div className='w-full courseLinks__content'>
                     <div className='courseLinks__input'>
                        <Text
                           size={ txtSizes.medium }
                           type={ txtType.medium150 }
                           inner='Product URL'
                        />
                        <div className='courseLinks__input__url'>
                           <div>
                              <Text
                                 size={ txtSizes.small }
                                 type={ txtType.regularDefaultGrey }
                                 inner={ currentCourse.type === '2' ? `${ apiUrl }/portal/community` : currentCourse.type === '1' ? `${ apiUrl }/portal` : `${ apiUrl }/programs` }
                                 color='#8a94a2'
                              />
                           </div>
                           <TextInput
                              id='url'
                              label=''
                              placeholder=''
                              leftText=''
                              name='url'
                              value={ currentCourse.type === '2' ? currentCourse.community_id : currentCourse.type === '1' ? 'membership' : currentCourse.url.length > 31 ? `${ currentCourse.url.slice(0, 45) }...` : currentCourse.url }
                              disabled={ true }
                           />
                        </div>

                        <div
                           className='copy'
                           title='copy'
                           role='presentation'
                           onClick={ () => copyCodeToClipboard(
                              currentCourse.type === '2' ? `${ apiUrl }/portal/community/${ currentCourse.community_id }`
                                 : currentCourse.type === '1' ? `${ apiUrl }/portal/membership` : `${ apiUrl }/programs/${ currentCourse.url }`, 'url') }
                        >
                           <Icon name='copyNew' />
                        </div>
                        { copyView === 'url'
                    && <div className='copiedText'>Copied</div>
                        }
                     </div>
                     <div className='visitUrl'>
                        <Link to={ currentCourse.type === '2' ? `/portal/community/${ currentCourse.community_id }` : currentCourse.type === '1' ? '/portal/membership' : `/programs/${ currentCourse.url }` } target='_blank'>
                           <BaseButton
                              text='Visit URL'
                              size={ btnSize.large }
                              theme={ btnType.secondary }
                              onClick={ () => {} }
                           />
                        </Link>
                     </div>
                  </div>
                  {/* <div className='m-t-m w-full courseLinks__content'>
                  <div className='courseLinks__input'>
                     <TextInput
                        id='sign_in_url'
                        label='Sign In URL'
                        placeholder='mastercode'
                        leftText={ apiUrl }
                        name='sign_in_url'
                        onChange={ () => {} }
                        value={ `${ Router.route('LOGIN').getCompiledPath() }` }
                        autocomplate={ false }
                        disabled={ true }
                     />
                     <div className='copy' title='copy' role='presentation' onClick={ () => copyCodeToClipboard(`${ apiUrl }${ Router.route('LOGIN').getCompiledPath() }`, 'sign_in_url') }>
                        <Icon name='copyNew' />
                     </div>
                     { copyView === 'sign_in_url'
                    && <div className='copiedText'>Copied</div>
                     }
                  </div>
                  <div className='visitUrl'>
                     <Link to={ Router.route('LOGIN').getCompiledPath() } target='_blank'>
                        <BaseButton
                           text='Visit URL'
                           size={ btnSize.large }
                           theme={ btnType.secondary }
                           onClick={ () => {} }
                        />
                     </Link>
                  </div>
               </div> */}

                  {/* <div className='m-t-m w-full courseLinks__content'>
                  <div className='courseLinks__input'>
                     <TextInput
                        id='sign_up_url'
                        label='Sign Up URL'
                        placeholder='mastercode'
                        leftText={ apiUrl }
                        // icon='Copy'
                        name='sign_up_url'
                        onChange={ () => {} }
                        value={ `${ Router.route('SIGNUP_STUDENT').getCompiledPath() }` }
                        autocomplate={ false }
                        disabled={ true }
                     />
                     <div className='copy' title='copy' role='presentation' onClick={ () => copyCodeToClipboard(`${ apiUrl }${ Router.route('SIGNUP_STUDENT').getCompiledPath() }`, 'sign_up_url') }>
                        <Icon name='copyNew' />
                     </div>
                     { copyView === 'sign_up_url'
                    && <div className='copiedText'>Copied</div>
                     }
                  </div>
                  <div className='visitUrl'>
                     <Link to={ Router.route('SIGNUP_STUDENT').getCompiledPath() } target='_blank'>
                        <BaseButton
                           text='Visit URL'
                           size={ btnSize.large }
                           theme={ btnType.secondary }
                           onClick={ () => {} }
                        />
                     </Link>
                  </div>

               </div> */}
               </>
            )}
         {!isCheckoutPreview
            && (
               <>
                  <div className='w-full courseLinks__content'>
                     <div className='courseLinks__input'>
                        <Text
                           size={ txtSizes.medium }
                           type={ txtType.medium150 }
                           inner='Connect Page URL'
                        />
                        <div className='courseLinks__input__url'>
                           <div>
                              <Text
                                 size={ txtSizes.small }
                                 type={ txtType.regularDefaultGrey }
                                 inner={ `${ apiUrl }/bridge` }
                                 color='#8a94a2'
                              />
                           </div>
                           <TextInput
                              id='url'
                              label=''
                              placeholder=''
                              leftText=''
                              name='bridge'
                              value={ currentCourse.type === '1' ? `${ currentCourse.id }?video=true` : currentCourse.id }
                              disabled={ true }
                           />
                        </div>

                        <div
                           className='copy'
                           title='copy'
                           role='presentation'
                           onClick={ () => copyCodeToClipboard(
                              `${ apiUrl }/bridge/${ currentCourse.type === '1' ? `${ currentCourse.id }?video=true` : currentCourse.id }`, 'bridge'
                           ) }
                        >
                           <Icon name='copyNew' />
                        </div>
                        { copyView === 'bridge'
                    && <div className='copiedText'>Copied</div>
                        }
                     </div>
                     <div className='visitUrl'>
                        <Link to={ `/bridge/${ currentCourse.type === '1' ? `${ currentCourse.id }?video=true` : currentCourse.id }` } target='_blank'>
                           <BaseButton
                              text='Visit URL'
                              size={ btnSize.large }
                              theme={ btnType.secondary }
                              onClick={ () => {} }
                           />
                        </Link>
                     </div>
                  </div>
               </>
            )}
         { currentCourse.pricings && currentCourse.pricings.map(pricing => {
            if (!pricing.price) {
               return null;
            }
            return (
               <div className='w-full courseLinks__content' key={ pricing.id }>
                  <div className='courseLinks__input'>
                     <Text
                        size={ txtSizes.medium }
                        type={ txtType.medium150 }
                        inner='Product URL'
                     />
                     <div className='courseLinks__input__url'>
                        <div>
                           <Text
                              size={ txtSizes.small }
                              type={ txtType.regularDefaultGrey }
                              inner={ `${ checkoutUrl }` }
                              color='#8a94a2'
                           />
                        </div>
                        <TextInput
                           id='checkout_url'
                           //  label={ `Product URL ${ pricing.price ? `${ getCurrencySumbol(pricing.currency) } ${ pricing.price }` : 'Free' }` }
                           placeholder=''
                           leftText={ `${ checkoutUrl }` }
                           name='checkout_url'
                           onChange={ () => {} }
                           autocomplate={ false }
                           value={ `/${ app.uuid }/0/${ currentCourse.id }/${ pricing.id }` }
                           disabled={ true }
                        />
                     </div>

                     <div className='copy' role='presentation' title='copy' onClick={ () => copyCodeToClipboard(`${ checkoutUrl }${ app.uuid }/0/${ currentCourse.id }/${ pricing.id }`, `checkout_url${ pricing.id }`) }>
                        <Icon name='copyNew' />
                     </div>
                     { copyView === `checkout_url${ pricing.id }`
                             && <div className='copiedText'>Copied</div>
                     }
                  </div>
                  <a href={ `${ checkoutUrl }${ app.uuid }/0/${ currentCourse.id }/${ pricing.id }` } target='_blank' rel='noopener noreferrer'>
                     <div className='visitUrl'>
                        <BaseButton
                           text='Visit URL'
                           size={ btnSize.large }
                           theme={ btnType.secondary }
                           onClick={ () => {} }
                        />
                     </div>
                  </a>

               </div>
            );
         }
         )

         }

      </div>
   );
};

CourseLinksModalContent.propTypes = {
   currentCourse: PropTypes.object,
   copyCodeToClipboard: PropTypes.func,
   copyView: PropTypes.string,
   isCheckoutPreview: PropTypes.bool,
   app: PropTypes.object,
};

CourseLinksModalContent.defaultProps = {
   isCheckoutPreview: false,
};

export default CourseLinksModalContent;
