import React from 'react';
import './index.scss';
// import PropTypes from 'prop-types';
import Text, { TYPE as textType, SIZES as textSizes } from 'components/elements/Text';
import Icon from 'components/elements/Icon';
import { useHistory } from 'react-router-dom';
import MobileHeader from 'views/layout/MobileHeader';
import SiteHeader from 'containers/modules/siteheader/index.mob';

const AutomationCreateHeader = () => {
   const history = useHistory();
   return (
      <div className='automation_header'>
         <MobileHeader>
            <SiteHeader
               isLeftAction
               goToBack={ () => history.goBack() }
               title='Automations'
               subTitle='Start From Scratch'
            />
         </MobileHeader>
         <div className='siteHeader'>
            <div className='siteHeader__top'>
               <div className='siteHeader__title'>
                  <div className='flex course__name automation__left'>
                     <div
                        className='m-r-exs left-icon'
                        onClick={ () => history.goBack() }
                        role='presentation'
                     >
                        <Icon
                           name='Left'
                        />
                     </div>
                     <Text
                        type={ textType.normal }
                        size={ textSizes.extraSmall }
                        inner='Automations'
                     />
                  </div>
               </div>
               {/* <div className='siteHeader__rightSide automation__rightSide'>
               <BaseButton
                  theme={ btnTheme.darkGreen }
                  size={ btnSizes.large }
                  text='Save'
                  onClick={ () => {} }
               />
            </div> */}
            </div>
            <div className='siteHeader__bottom'>
               <Text
                  type={ textType.normal }
                  size={ textSizes.large }
                  inner=' Start From Scratch'
               />
            </div>
         </div>
      </div>
   );
};

AutomationCreateHeader.propTypes = {

};

export default AutomationCreateHeader;
