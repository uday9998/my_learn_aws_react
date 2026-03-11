import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';
import DynamicWrapper from 'components/elements/wrappers/DynamicWrapper';
import Copy from 'components/elements/Copy';
import BaseButton, { SIZES as btnSizes } from 'components/elements/buttons/BaseButton';

const EmailDnsSettingsModal = ({ dnsSettings, setIsOpen, open }) => {
   const [isMobileTable, setIsMobileTable] = useState(false);
   useEffect(() => {
      function handleResize() {
         const isMobile = (window.innerWidth > 1023 && window.innerWidth < 1250)
            || window.innerWidth < 680;
         setIsMobileTable(isMobile);
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, [setIsMobileTable]);
   return (
      <DynamicWrapper
         title='DNS Settings'
         borderColor='#cddaf1'
         openedHasShadow
         openedBackColor='#fff'
         backColor='#fff'
         controlOpen={ open }
         setIsOpen={ setIsOpen }
      >
         <div className='emailDnsSettings'>
            <table className={ cx('dns-settings-table', { mobileTable: isMobileTable }) }>
               <thead>
                  <tr>
                     <th>Type</th>
                     <th>Hostname</th>
                     <th>Add This Value</th>
                     <th />
                  </tr>
               </thead>
               <tbody>
                  {dnsSettings.map(({
                     name, hostname, value, type, verified,
                  }) => {
                     return (
                        <tr>
                           <td>{type}</td>
                           <td className='hostnameValue'>
                              <Copy value={ hostname }>
                                 {hostname}
                              </Copy>
                           </td>
                           <td className='wrapped-text'>
                              <div className='valueDesktop'>
                                 <Copy value={ value }>
                                    {value}
                                 </Copy>
                              </div>
                              <div className='valueMobile'>
                                 <Copy value={ value }>
                                    <BaseButton
                                       text='Copy Value'
                                       size={ btnSizes.medium }
                                    />
                                 </Copy>
                              </div>
                           </td>
                           <td>
                              <div
                                 className={ cx('recordState', { verified }) }
                                 data-record={ name }
                                 data-state={ verified ? 'Verified' : 'Inactive' }
                              >
                                 <div className='recordState__icon'>
                                    <div className='recordState__icon__wrapper'>
                                       {verified ? (
                                          <div className='check' />
                                       ) : 'X'}
                                    </div>
                                 </div>
                                 {!isMobileTable
                                    && (
                                       <div className='recordState__name'>
                                          <div>
                                             <div>{name}</div>
                                             <div>{verified ? 'Verified' : 'Inactive'}</div>
                                          </div>
                                       </div>
                                    )}

                              </div>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </DynamicWrapper>
   );
};

EmailDnsSettingsModal.propTypes = {
   dnsSettings: PropTypes.array,
   open: PropTypes.bool,
   setIsOpen: PropTypes.func,
};

export default EmailDnsSettingsModal;
