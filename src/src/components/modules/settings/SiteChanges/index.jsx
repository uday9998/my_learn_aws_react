import React from 'react';
import './index.scss';
import ItemWrapper from 'components/elements/wrappers/ItemWrapper';
// import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
// import Select from 'components/elements/form/Select';
// import ColorInput from 'components/elements/form/ColorInput';

const SiteChanges = () => (
   <ItemWrapper>
      <div className='siteChanges__module'>
         {/* <Text
            type={ TextType.bold }
            size={ TextSize.medium }
            inner='Class Changes'
         />
         <div className='m-t-exs m-b-m'>
            <Text
               style={ { fontSize: '12px' } }
               type={ TextType.normal }
               inner={ [
                  ' *Your logo will appear on the top left of the navigation bar, and on emails sent to your students.',
                  <br />,
                  'For best results, upload a PNG or JPEG file under',
               ] }
               color='#b6c0cd'
            />
         </div>
         <Select
            placeholder='Avenue Next'
            iconColor='#3f4f65'
            label='Theme Font'
         />
         <div className='m-t-exl m-b-m'>
            <Text
               style={ { fontSize: '12px' } }
               type={ TextType.normal }
               inner='*Changes to your site colors might take up to a minute to appear.'
               color='#b6c0cd'
            />
         </div>
         <ColorInput label='Header background Color' subLabel='' />
         <div className='m-t-m m-b-m'>
            <ColorInput label='Footer background Color' subLabel='' />
         </div>
         <ColorInput label='Primary Button Color' subLabel='' /> */}
      </div>
   </ItemWrapper>
);

export default SiteChanges;
