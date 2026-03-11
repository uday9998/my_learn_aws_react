import React, { useEffect, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Text, { SIZES as sizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import { createPortal } from 'react-dom';
import Container from '../AdminContainer';
import LeftBar from '../LeftBar';
import MobileHeader from '../MobileHeader';

const AdminLayout = ({ children, isShowTrial }) => {
   const { pathname } = useLocation(); 
   const [pageLink, setPageLink] = useState({
      link: null,
      linkText: null,
   });
   const childrenArray = React.Children.map(children, (child) => {
      return React.cloneElement(child, {});
   });

   useEffect(() => {
      if (pathname.includes('admin/dashboard')) {
         setPageLink({
            link: 'https://support.miestro.com/939754-Analytics-Section',
            linkText: 'Analytics', 
         });
      } else if (pathname.includes('settings/emails/tracking')) {
         setPageLink({
            link: 'https://support.miestro.com/939754-Analytics-Section',
            linkText: 'Analytics', 
         });
      } else {
         setPageLink({
            link: null,
            linkText: null,
         });
      }
   }, [pathname]);

   const handleOpenLink = () => {
      window.open(pageLink.link, '_blank');
   };
   return (
      <div className='adminLayout notranslate' style={ { height: isShowTrial && 'calc(100vh - 40px)', position: pageLink.link && 'relative' } }>
         {
            pageLink.link ? (
               <>
                  <div
                     style={ {
                        background: (pathname.includes('edit') && !pathname.includes('membership')) || pathname.includes('subscriptionMetrics') ? '#fff' : 'transparent',
                        position: pageLink.link && 'absolute',
                        top: pathname.includes('settings/emails/tracking') ? -9 : 0,
                        left: 0,
                        right: 0,
                        zIndex: 99999,
                     } }
                     className='icon__text__wrapper'>
                     <Icon name='ToolTipI' />
                     <Text 
                        inner={ `Learn More About ${ pageLink.linkText }` }
                        size={ sizes.size_14 }
                        className='link__text'
                        onClick={ handleOpenLink }
                     />
                  </div>
                  {childrenArray}
               </>
            ) : childrenArray
         }
         
         
      </div>
   );
};

AdminLayout.Container = Container;
AdminLayout.LeftBar = LeftBar;
AdminLayout.MobileHeader = MobileHeader;

AdminLayout.propTypes = {
   children: PropTypes.any,
   isShowTrial: PropTypes.bool,
};
export default AdminLayout;
