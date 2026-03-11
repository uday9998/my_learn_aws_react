import React, { useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Tabs from 'components/elements/tabs';
import Icon from 'components/elements/Icon';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import LoaderSpinner from 'components/elements/LoaderSpiner';
import BaseButton from 'components/elements/buttons/BaseButtonNew';
import { useSelector } from 'react-redux';
import { siteInfoSelector } from 'state/modules/common/selectors';
import { createPortal } from 'react-dom';
import PricingPopup from 'components/elements/PricingPopup';

const InnerWrapper = ({
   children, style, hasSelected, active, hasShadow, title, tooltip, hasTabs, tabName,
   selectedPage, setSelectedPage, isSitePage, onClick, isLoading, sites,
}) => {
   const { permissions } = useSelector(siteInfoSelector);
   const [showPopup, setShowPopup] = useState(false);
   const [popupTitle, setPopupTitle] = useState('');

   const handleCreateSite = () => {
      if (Array.isArray(permissions)) {
         onClick();
      } else if (!permissions.sites_count || sites.length === permissions.sites_count) {
         setPopupTitle('Sites');
         setShowPopup(true);
      } else {
         onClick();
      }
   };

   const handleClosePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className='innerWrapper_container'>
         {
            showPopup && createPortal(<PricingPopup popupTitle={ popupTitle } handleClosePopup={ handleClosePopup } />, document.body)
         }
         <div
            style={ style }
            className={ classNames(
               'innerWrapper',
               {
                  'shadow': hasShadow,
                  'selected': hasSelected,
                  'active': active,
               }
            ) }
         >
            {isLoading ? (
               <LoaderSpinner />
            ) : (
               <>
                  <div className='innerWrapper__title'>
                     <Text
                        style={ { whiteSpace: 'noWrap' } }
                        inner={ title }
                        type={ txtTypes.mediumLarge }
                        size={ txtSizes.xlarge }
                     />
                     {/* {tooltip && (
                        <div className='tooltip' data-tip={ tooltip }>
                           <Icon name='ToolTip' className='backIcon' />
                           <ReactTooltip />
                        </div>
                     )} */}
                     <div className='innerWrapper__button'>
                        {isSitePage ? (
                           <BaseButton
                              text='Add Site'
                              onClick={ handleCreateSite }
                           />
                        ) : ''}
                     </div>
                  </div>
                  {hasTabs && (
                     <Tabs
                        variants={ tabName }
                        selectedVariant={ selectedPage }
                        isButton={ false }
                        isFullWidth={ false }
                        hasIcon={ true }
                        onSelect={ (value) => setSelectedPage(value) }
                     />
                  )}
                  {children}
               </>
            )}
         </div>
      </div>
   );
};

InnerWrapper.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]).isRequired,
   style: PropTypes.object,
   hasSelected: PropTypes.bool,
   active: PropTypes.bool,
   hasShadow: PropTypes.bool,
   title: PropTypes.string,
   tooltip: PropTypes.string,
   hasTabs: PropTypes.bool,
   tabName: PropTypes.array,
   selectedPage: PropTypes.string,
   setSelectedPage: PropTypes.func,
   isLoading: PropTypes.bool,
   onClick: PropTypes.func,
   isSitePage: PropTypes.bool,
   sites: PropTypes.array,
};

InnerWrapper.defaultProps = {
   hasSelected: false,
   active: false,
   hasShadow: false,
   tooltip: 'Example Text',
   hasTabs: false,
   tabName: [],
};

export default InnerWrapper;
