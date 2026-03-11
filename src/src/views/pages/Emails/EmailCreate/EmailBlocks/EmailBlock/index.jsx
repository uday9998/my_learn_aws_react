import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import IconNew from 'components/elements/iconsSize';
import './index.scss';


const EmailBlock = ({
   email, addBlock,
}) => {
   let attachedFileBLock = {
      name: 'Attached file',
      icon: 'PaperM',
      value: 'AttachedFile',
   };

   if (email.blocks.filter(block => block.email_format === 'AttachedFile')[0]) {
      attachedFileBLock = {};
   }

   const defaultBlocks = [
      {
         name: 'Text',
         icon: 'TextM',
         value: 'Text',
      },
      {
         name: 'Image',
         icon: 'ImageM',
         value: 'Image',
      },
      { ...attachedFileBLock },
      {
         name: 'Logo',
         icon: 'LightM',
         value: 'Logo',
      },
      {
         name: 'Link',
         icon: 'multimediaM',
         value: 'LinkBlock',
      },
      {
         name: 'Social Media',
         icon: 'InstagramM',
         value: 'SocialMedia',
      },
      {
         name: 'Button',
         icon: 'ButtonM',
         value: 'Button',
      },
      {
         name: 'Divider',
         icon: 'DividerM',
         value: 'Divider',
      },
      {
         name: 'Empty Block',
         icon: 'SpaceM',
         value: 'EmptyBlock',
      },
      {
         name: 'Address',
         icon: 'PinM',
         value: 'Address',
      },
      // {
      //    name: 'Footer',
      //    icon: 'FooterM',
      //    value: 'Footer',
      // },
   ];
   return (
      <div className='email__blocks__content'>
         <div>
            {defaultBlocks.map(block => {
               if (!block.value) {
                  return null;
               }
               return (
                  <div
                     className='email__blocks__type'
                     key={ block.value }
                     onClick={ () => addBlock(block.value) }
                     role='presentation'
                  >
                     <div>
                        <IconNew name={ block.icon } />
                     </div>
                     <div>
                        <Text
                           inner={ block.name }
                           type={ txtTypes.regularDefault }
                           size={ txtSizes.small }
                        />
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

EmailBlock.propTypes = {
   email: PropTypes.object,
   addBlock: PropTypes.func,
};

export default EmailBlock;
