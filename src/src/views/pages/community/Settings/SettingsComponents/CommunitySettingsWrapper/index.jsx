import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Button from 'components/elements/buttons/BaseButtonNew';
import Icon from 'components/elements/Icon';
import ReactTooltip from 'react-tooltip';

const CommunitySettingsWrapper = ({
   title, tooltip, onSave, children, isDisabled,
}) => {
   return (
      <div className='community__settings__wrapper'>
         <div className='community__settings__wrapper__title'>
            <Text
               style={ { whiteSpace: 'noWrap' } }
               inner={ title }
               type={ txtTypes.mediumLarge }
               size={ txtSizes.xlarge }
            />
            {/* {tooltip && (
               <div className='tooltip' data-tip={ tooltip }>
                  <Icon name='ToolTip' className='backIcon' />
               </div>
            )} */}
         </div>
         {children}
         {onSave && <div className='community__settings__wrapper__line' />}
         {onSave && (
            <div className='community__settings__wrapper__button'>
               <Button
                  text='Save Changes'
                  disabled={ isDisabled }
                  onClick={ () => onSave() }
               />
            </div>
         )}
      </div>
   );
};

CommunitySettingsWrapper.propTypes = {
   title: PropTypes.string,
   tooltip: PropTypes.string,
   children: PropTypes.any,
   onSave: PropTypes.func,
   isDisabled: PropTypes.func,
};

export default CommunitySettingsWrapper;
