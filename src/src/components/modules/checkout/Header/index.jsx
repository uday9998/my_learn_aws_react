import React from 'react';
import Icon from 'components/elements/Icon';
import classNames from 'classnames';
import Text, { TYPE as TextType, SIZES as TextSize } from 'components/elements/Text';
import PropTypes from 'prop-types';
import './index.scss';

const Header = ({ activeHeader, setActiveHeader }) => {
   return (
      <div className='header'>
         <div
            className={ classNames(
               'template',
               activeHeader === 'template' && 'header-active'
            ) }
            onClick={ () => setActiveHeader('template') }
            role='presentation'
         >
            <Icon name='Template' />
            <Text
               size={ TextSize.small }
               type={ TextType.demiBold }
               inner='Template'
               color='#3f4f65'
            />

         </div>
         <div
            className={ classNames(
               'header-advanced-settings',
               activeHeader === 'settings' && 'header-active'
            ) }
            onClick={ () => setActiveHeader('settings') }
            role='presentation'
         >
            <Icon name='Advancedsettings' />
            <Text
               size={ TextSize.small }
               type={ TextType.demiBold }
               inner='Advanced Settings'
               color='#3f4f65'
            />
         </div>
         <div
            className={ classNames(
               'header-tracking',
               activeHeader === 'tracking' && 'header-active'
            ) }
            onClick={ () => setActiveHeader('tracking') }
            role='presentation'
         >
            <Icon name='Tracking' />
            <Text
               size={ TextSize.small }
               type={ TextType.demiBold }
               inner='Tracking'
               color='#3f4f65'
            />
         </div>
      </div>
   );
};

Header.propTypes = {
   activeHeader: PropTypes.string,
   setActiveHeader: PropTypes.func,
};

export default Header;
