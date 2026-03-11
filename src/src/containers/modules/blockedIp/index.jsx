/* eslint-disable no-eval */
import React from 'react';
import { getSiteBuilderInfo } from 'api';

const NotFound = React.lazy(() => import('views/pages/404'));
const BlockedIp = () => {
   const [loading, setLoading] = React.useState(true);
   const [isBlock, setIsBlock] = React.useState(false);
   React.useEffect(() => {
      eval('!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});');
      eval("window.Beacon('init', '470fe52d-c109-498c-bd83-02c79651ad75')");
      getSiteBuilderInfo().catch(({ response }) => {
         if (response?.data && response?.data['ip-blocked']) {
            setIsBlock(true);
         }
         return null;
      }).finally(() => {
         setLoading(false);
      });
   }, []);
   return (
      <div className='blockedIpWrapper'>
         {!loading && (
            <>
               {isBlock ? (
                  <>
                     <img alt='' src='https://miestro.com/sales/src/images/logo.png' />
                     <div className='blockedIpWrapper__text'>
            Sorry, but you can not use a VPN to access this site.
                     </div>
                  </>
               ) : (
                  <NotFound />
               )}
            </>
         )}
      </div>
   );
};


export default BlockedIp;
