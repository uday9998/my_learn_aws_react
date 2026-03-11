import React from 'react';
import BaseButton, { THEMES as btnThemes, SIZES as btnSizes } from 'components/elements/buttons/BaseButtonNew';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import PropTypes from 'prop-types';
import './index.scss';

function CommunityHeader({
   goBack, title, onSave, preview, 
}) {
   return (
      <div className='community__header'>
         <div className='community__header__left'>
            <Icon name='ArrowBackNew' onClick={ goBack } />
            <Text
               inner={ title || 'Go Back' }
               type={ types.regular160 }
               size={ sizes.xlarge }
            />
         </div>
         {/* <div className='community__header__right'>
            <BaseButton
               iconName='EyeProgramM'
               text='Preview Community'
               onClick={ preview }
               theme={ btnThemes.secondary }
               isIconRight={ true }
               size={ btnSizes.xsmall }

            />
            <div className='community__header__right__liner' />
            <BaseButton
               size={ btnSizes.xsmall }
               text='Save Changes'
               onClick={ onSave }
               theme={ btnThemes.secondary }
            />
            <BaseButton
               text='Save and Close'
               onClick={ () => {
                  onSave();
                  goBack();
               } }
               size={ btnSizes.xsmall }
            />
         </div> */}
      </div>
   );
}

CommunityHeader.propTypes = {
   goBack: PropTypes.func,
   onSave: PropTypes.func,
   preview: PropTypes.func,
   title: PropTypes.string,
};

export default CommunityHeader;
