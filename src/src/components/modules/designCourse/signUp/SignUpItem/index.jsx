import React from 'react';
import PropTypes from 'prop-types';
import SelectedWrapper from 'components/elements/wrappers/SelectedWrapper';
import Text, { SIZES as txtSizes, TYPE as txtType } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import './index.scss';

const SignUpItem = ({
   text, active, icon, switchTab, tabId,
}) => {
   return (
      <SelectedWrapper
         isOpen={ false }
         active={ active }
      >
         <div
            className='signUpItem'
            role='presentation'
            onClick={ () => {
               switchTab(tabId);
            } }
         >
            { icon && <Icon name={ icon } color={ (active && '#7CB740') || '#C2CEDB' } /> }
            <Text
               inner={ text }
               type={ txtType.normal }
               size={ txtSizes.small }
            />
         </div>
      </SelectedWrapper>
   );
};

export default SignUpItem;

SignUpItem.propTypes = {
   text: PropTypes.string,
   active: PropTypes.bool,
   icon: PropTypes.string,
   tabId: PropTypes.any,
   switchTab: PropTypes.func,
};

SignUpItem.defaultProps = {
   text: 'Text',
   active: false,
   icon: '',
};
