import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'components/elements/switchNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import IconButton from 'components/elements/buttons/IconButton';
import { useHistory } from 'react-router';

const ThankYouBlock = ({ data, onChange }) => {
   const history = useHistory();
   const openPreview = () => {
      const url = history.push('/admin/other-pages/thank_you');
      return url;
   };
   return (
      <div className='plan__pricing__left__plans__thank'>
         <div className='plan__thank__you__top'>
            <div className='plan__thank__you__top__withprev'>
               <Switch
                  value={ data.thank_you_page_active }
                  label='Thank You Page'
                  onChange={ () => onChange('thank_you_page_active', data.thank_you_page_active ? 0 : 1) }
                  size='medium'
                  positionText='left'
               />
               {!!data.thank_you_page_active && (
                  <IconButton
                     name='eyeM'
                     title='preview'
                     onClick={ () => { openPreview(); } }
                  />
               )}
            </div>
            <Text
               inner='This is where customers will be directed after a purchase. You can set the Post-Purchase page here.'
               type={ types.regularDefault }
               size={ sizes.small }
               style={ { color: '#727978' } }
            />
         </div>
         {/* <div className='plan__thank__you__bottom'>
            <div className='plan__thank__you__bottom__block'>
               <div className='block__flex'>
                  <Switch
                     value={ data.taxes }
                     label='System Thank You Page'
                     onChange={ () => onChange('taxes', data.taxes === 1 ? 0 : 1) }
                     size='medium'
                     positionText='left'
                  />
                  <Text
                     inner='Designed with love by the Miestro team'
                     type={ types.regularDefault }
                     size={ sizes.small }
                     style={ { color: '#727978' } }
                  />
               </div>
               <div className='block__buttons'>
                  <Button
                     text='Preview'
                     onClick={ () => alert('pendding') }
                     theme={ themes.secondary }
                     iconName=''
                  />
                  <Button
                     text='Edit System Page'
                     onClick={ () => alert('pendding') }
                  />
               </div>
            </div>
         </div> */}
      </div>
   );
};

ThankYouBlock.propTypes = {
   data: PropTypes.object,
   onChange: PropTypes.func,
};

export default ThankYouBlock;
