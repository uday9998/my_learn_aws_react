
import React from 'react';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import Icon from 'components/elements/Icon';
import './index.scss';
import PropTypes from 'prop-types';

function ReportDashboardOther({ goTo, isHaveTracking }) {
   return (
      <div className='report-dashboard-other'>
         <Text inner='Other Metrics' style={ { marginBottom: '16px' } } size={ txtSizes.xlarge } type={ txtTypes.regularDefault } />
         <div className='report-dashboard-other-cards'>
            <div className='other-card-line'>
               <div className='other-card'>
                  <div className='other-card-container'>
                     <div className='other-card-icon'>
                        <div className='other-card-left other-card-left-green'>
                           <Icon name='Dollar' className='other-card-left-dollar' />
                        </div>
                     </div>
                     <div className='other-card-right'>
                        <div className='other-card-right-info'>
                           <Text inner='Net Revenue' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                           <Text inner='Track the total income generated from your video programs, after deducting necessary expenses.' size={ txtSizes.small14 } type={ txtTypes.regularLarge } />
                        </div>
                        <button type='button' onClick={ () => goTo('ADMIN_NET_REVENUE') } className='other-card-right-view'>
                           <Text inner='View' size={ txtSizes.xsmall } type={ txtTypes.regularDefault } />
                           <Icon name='ViewPage' />
                        </button>
                     </div>
                  </div>
               </div>
               <div className='other-card'>
                  <div className='other-card-container'>
                     <div className='other-card-icon'>
                        <div className='other-card-left other-card-left-light'>
                           <Icon name='Progress' className='other-card-left-dollar' />
                        </div>
                     </div>
                     <div className='other-card-right'>
                        <div className='other-card-right-info'>
                           <Text inner='Product Progress' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                           <Text inner='View your members progression of product' size={ txtSizes.small14 } type={ txtTypes.regularLarge } />
                        </div>
                        <button type='button' onClick={ () => goTo('ADMIN_CLASS_PROGRESS') } className='other-card-right-view'>
                           <Text inner='View' size={ txtSizes.xsmall } type={ txtTypes.regularDefault } />
                           <Icon name='ViewPage' />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div className='other-card-line'>
               <div className='other-card'>
                  <div className='other-card-container'>
                     <div className='other-card-icon'>
                        <div className='other-card-left other-card-left-purple'>
                           <Icon name='Subscription' className='other-card-left-dollar' />
                        </div>
                     </div>
                     <div className='other-card-right'>
                        <div className='other-card-right-info'>
                           <Text inner='Subscription Metrics' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                           <Text inner='Check your subscription data to understand subscriber engagement and growth.' size={ txtSizes.small14 } type={ txtTypes.regularLarge } />
                        </div>
                        <button type='button' onClick={ () => goTo('ADMIN_SUBSCRIPTION_METRICS') } className='other-card-right-view'>
                           <Text inner='View' size={ txtSizes.xsmall } type={ txtTypes.regularDefault } />
                           <Icon name='ViewPage' />
                        </button>
                     </div>
                  </div>
               </div>
               <div className='other-card'>
                  <div className='other-card-container'>
                     <div className='other-card-icon'>
                        <div className='other-card-left other-card-left-alarm'>
                           <Icon name='Page' className='other-card-left-dollar' />
                        </div>
                     </div>
                     <div className='other-card-right'>
                        <div className='other-card-right-info'>
                           <Text inner='Page Views' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                           <Text inner='Analyze your site traffic to identify key growth opportunities and optimize your strategy.' size={ txtSizes.small14 } type={ txtTypes.regularLarge } />
                        </div>
                        <button type='button' onClick={ () => goTo('ADMIN_PAGE_VIEWS') } className='other-card-right-view'>
                           <Text inner='View' size={ txtSizes.xsmall } type={ txtTypes.regularDefault } />
                           <Icon name='ViewPage' />
                        </button>
                     </div>
                  </div>
               </div>

            </div>
            <div className='other-card-line'>
               <div className='other-card'>
                  <div className='other-card-container'>
                     <div className='other-card-icon'>
                        <div className='other-card-left other-card-left-video'>
                           <Icon name='VideoMetric' className='other-card-left-video' />
                        </div>
                     </div>
                     <div className='other-card-right'>
                        <div className='other-card-right-info'>
                           <Text inner='Video Metrics' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                           <Text inner='Track and understand how your community engage and progress through your video content.' size={ txtSizes.small14 } type={ txtTypes.regularLarge } />
                        </div>
                        <button type='button' onClick={ () => goTo('ADMIN_VIDEO_METRICS') } className='other-card-right-view'>
                           <Text inner='View' size={ txtSizes.xsmall } type={ txtTypes.regularDefault } />
                           <Icon name='ViewPage' />
                        </button>
                     </div>
                  </div>
               </div>
               <div className='other-card'>
                  <div className='other-card-container'>
                     <div className='other-card-icon'>
                        <div className='other-card-left other-card-left-refunds'>
                           <Icon name='Refunds' className='other-card-left-refunds' />
                        </div>
                     </div>
                     <div className='other-card-right'>
                        <div className='other-card-right-info'>
                           <Text inner='Refunds' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                           <Text inner='Monitor refunds issued for your products giving you a clear financial overview.' size={ txtSizes.small14 } type={ txtTypes.regularLarge } />
                        </div>
                        <button type='button' onClick={ () => goTo('ADMIN_REFOUNDS') } className='other-card-right-view'>
                           <Text inner='View' size={ txtSizes.xsmall } type={ txtTypes.regularDefault } />
                           <Icon name='ViewPage' />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div className='other-card-line'>
               {isHaveTracking && (
                  <div className='other-card'>
                     <div className='other-card-container'>
                        <div className='other-card-icon'>
                           <div className='other-card-left other-card-left-email'>
                              <Icon name='EmailMetric' className='other-card-left-refunds' />
                           </div>
                        </div>
                        <div className='other-card-right'>
                           <div className='other-card-right-info'>
                              <Text inner='Email Metrics' size={ txtSizes.small } type={ txtTypes.regularDefault } />
                              <Text inner='Basic email recipient actions (open, click, bounce, etc).' size={ txtSizes.small14 } type={ txtTypes.regularLarge } />
                           </div>
                           <button type='button' onClick={ () => goTo('ADMIN_EMAIL_TRACKING') } className='other-card-right-view'>
                              <Text inner='View' size={ txtSizes.xsmall } type={ txtTypes.regularDefault } />
                              <Icon name='ViewPage' />
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
ReportDashboardOther.propTypes = {
   goTo: PropTypes.func,
   isHaveTracking: PropTypes.bool,
};
export default ReportDashboardOther;
