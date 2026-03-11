import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import BaseButton, { THEMES as btnType, SIZES as btnSize } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import { copyToClipBoard } from 'utils/copy';

const LinkView = ({
   onEdit, linkUrl, copyUrl, isValid, isOneLine, disableEdit,
}) => {
   return (
      <div className={ isOneLine ? 'LinkView LinkView_oneLine' : 'LinkView LinkView_twoLine' }>
         <div className='LinkView__top'>
            <div className='LinkView__top__text'>
               <Text
                  inner={ linkUrl }
                  size={ txtSizes.small_14 }
                  type={ txtTypes.regularDefaultGrey150 }
               />
            </div>
            <div className='LinkView__top__actions'>
               {!disableEdit && (
                  <div onClick={ () => onEdit() } role='presentation'>
                     <IconNew name='RenameCategoryM' />
                  </div>
               )}
               {isValid && (
                  <div onClick={ () => copyToClipBoard(copyUrl) } role='presentation'>
                     <IconNew name='CopyProgramM' />
                  </div>
               )}
            </div>
         </div>
         {isValid && !disableEdit && (
            <div className='LinkView__bottom'>
               <BaseButton
                  text='Visit URL'
                  size={ btnSize.full }
                  theme={ btnType.secondary }
                  onClick={ () => window.open(copyUrl, '_blank') }
               />
            </div>
         )}
      </div>
   );
};


LinkView.propTypes = {
   copyUrl: PropTypes.string,
   onEdit: PropTypes.func,
   linkUrl: PropTypes.string,
   isValid: PropTypes.bool,
   isOneLine: PropTypes.bool,
   disableEdit: PropTypes.bool,
};

export default LinkView;
