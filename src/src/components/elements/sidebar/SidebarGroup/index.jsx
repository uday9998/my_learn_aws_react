import React, { useContext } from 'react';
import './index.scss';
import Navigation from 'components/elements/Navigation';
import PropTypes from 'prop-types';
import Icon from 'components/elements/Icon';
import Text, { SIZES as txtSizes, TYPES as txtType } from 'components/elements/TextNew';
import { getWindowSize } from 'utils/getWindowSize';
import IconNew from 'components/elements/iconsSize';


export const ICON = {
   dashboard: 'Dashboard',
   plan: 'Plan',
   help: 'Help',
   promotion: 'Promotion',
   setting: 'Setting',
   member: 'Member',
   report: 'Report',
   course: 'Course',
};

const SidebarGroup = ({
   icon, user, userImage, className, style, title, children, isPageBuilder, onClick,
}) => {
   const Consumer = useContext(Navigation.Provider);
   const { activeGroup, changeGroup } = Consumer;
   let isActive = activeGroup === title;
   if (isPageBuilder) {
      isActive = true;
   }
   const { innerWidth } = getWindowSize();
   return (
      <div
         className={ `sidebarGroup ${ className }` }
         style={ style }
      >
         <div
            className={ `sidebarGroup__content ${ isActive ? 'sidebarGroup__active' : '' } ${ isActive && user ? 'sidebarGroup__user__active' : '' } ${ isPageBuilder ? 'small_sidebarGroup__content' : '' }  ${ user ? 'sidebarGroup__user' : '' }` }
            role='presentation'
            // eslint-disable-next-line max-len
            onClick={ isPageBuilder ? () => { onClick(); changeGroup(title, isPageBuilder); } : () => changeGroup(title) }
         >
            <div>
               { user ? <img src={ userImage } alt='' className='sidebarGroup__user-image' /> : <Icon name={ icon } className='sidebarGroup__svg' />}
               {
                  !isPageBuilder && (
                     <Text
                        size={ innerWidth < 1024 ? txtSizes.small : txtSizes.medium }
                        type={ innerWidth < 1024 ? txtType.regularDefault : txtType.mediumTitle }
                        inner={ title }
                        className={ `${ isPageBuilder ? 'small_sidebarLink_text' : '' } ` }
                        style={ {
                           color: '#444C4B',
                        } }
                     />
                  )
               }
               {/* {user && <IconNew name='ToggleMoreM' />} */}
            </div>
            {innerWidth < 1024
            && (
               <div>
                  <IconNew
                     name='ChevronupL'
                     // color={ defaultColor }
                     style={ { transform: !isActive && 'rotate(-180deg)' } }
                  />
               </div>
            )}

         </div>
         {
            isActive && (
               <ul className={ `sidebarGroup__list ${ isPageBuilder ? 'smal_sidebarGroup__list' : '' }` }>
                  {children}
               </ul>
            )
         }
      </div>
   );
};

SidebarGroup.propTypes = {
   icon: PropTypes.string,
   user: PropTypes.bool,
   userImage: PropTypes.string,
   className: PropTypes.string,
   style: PropTypes.object,
   title: PropTypes.string,
   isPageBuilder: PropTypes.bool,
   children: PropTypes.any,
   onClick: PropTypes.func,
};

SidebarGroup.defaultProps = {
   title: 'Dashboard',
   icon: 'Dashboard',
   user: false,
   isPageBuilder: false,
   className: '',
   onClick: () => {},
};

SidebarGroup.displayName = 'Group';
export default SidebarGroup;
