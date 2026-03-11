import React from 'react';
import PropTypes from 'prop-types';
import SiteHeader from 'views/layout/SiteHeader';
import BaseButton, { THEME as buttonTheme, SIZES as buttonSizes } from 'components/elements/buttons/BaseButton';
import './index.scss';

const DomainsHeader = ({ setIsModalOpen }) => {
   return (
      <div className='domains__header'>
         <SiteHeader
            title='Sites'
            hasArrow={ false }
            tooltip='Learn more: giving information about what happens when the new site is created. ie. blank slate, all settings reset to default, etc.'
            tooltipStyle={ { width: '300px', whiteSpace: 'normal' } }
            right={ (
               <BaseButton
                  theme={ buttonTheme.darkGreen }
                  size={ buttonSizes.large }
                  text='Add Site'
                  onClick={ () => setIsModalOpen(true) }
               />
            ) }
         />
      </div>
   );
};

DomainsHeader.propTypes = {
   setIsModalOpen: PropTypes.func,
};

export default DomainsHeader;
