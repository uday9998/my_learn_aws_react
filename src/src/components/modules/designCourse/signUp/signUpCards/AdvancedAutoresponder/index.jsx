/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import BaseButton, { THEME as btnTheme, SIZES as btnSize } from 'components/elements/buttons/BaseButton';
import NoSearchSvg from 'assets/images/no-search-result.svg';
import Router from 'routes/router';
import Select from 'components/elements/form/Select';
import Tooltip from 'components/elements/members/Tooltip';

const AdvancedAutoresponder = (
   {
      goTo, autoresponderOptions, autoResponderListsOptions, onChange, signUp: {
         advanced: {
            autoResponder_type, autoResponder_list,
         } = {},
      } = {}, handleSignUpSave,
   }
) => {
   return (
      <div className='signUpCard advanced advanced_autoresponder'>
         <div className='m-t-exl flex'>
            <Text
               type={ TextType.normal }
               size={ TextSize.small }
               inner='Autoresponder'
            />
            <Tooltip
               hintText='If you have an autoresponder integrated with Miestro this will add your new customers to those lists inside your autoresponder automatically.'
               hintStyle={ { bottom: 'auto', top: '18px' } }
            />
         </div>
         { autoresponderOptions && autoresponderOptions.length === 0 && (
            <>
               <div className='emptyIntegration'>
                  <Text
                     type={ TextType.regular }
                     size={ TextSize.small }
                     inner="You haven't connected any integrations yet."
                     color='#8a94a2'
                  />
               </div>
               <div className='noIntegration'>
                  <img src={ NoSearchSvg } alt='noCredit' />
               </div>
               <div className='connect m-b-exl'>
                  <BaseButton
                     theme={ btnTheme.lightBlue }
                     size={ btnSize.large }
                     text='Connect'
                     onClick={ () => goTo(`${ Router.route('ADMIN_SETTINGS').getCompiledPath() }#integrations`) }
                  />
               </div>
            </>
         )}
         { autoresponderOptions && autoresponderOptions.length > 0 && (
            <div className='connect m-t-exl'>
               <Select
                  placeholder='choose autoresponder...'
                  name='autoResponder_type'
                  value={ autoResponder_type }
                  options={ autoresponderOptions }
                  onChange={ onChange }
               />
            </div>
         )}
         { autoResponderListsOptions && autoResponderListsOptions.length > 0 && (
            <div className='connect m-t-exl'>
               <Select
                  placeholder='choose list...'
                  name='autoResponder_list'
                  value={ autoResponder_list }
                  options={ autoResponderListsOptions }
                  onChange={ onChange }
               />
            </div>
         )}

         <div className='btnsBlock m-t-exl'>
            <BaseButton
               theme={ btnTheme.darkGreen }
               size={ btnSize.extraLargeNarrow }
               onClick={ handleSignUpSave }
               text='Save'
               className='save-detalis'
            />
         </div>
      </div>
   );
};

AdvancedAutoresponder.propTypes = {
   signUp: PropTypes.object,
   handleSignUpSave: PropTypes.func,
   goTo: PropTypes.func,
   autoresponderOptions: PropTypes.array,
   autoResponderListsOptions: PropTypes.array,
   onChange: PropTypes.func,
};

export default AdvancedAutoresponder;
